#include <iostream>
#include <iomanip>
#include <cstring>
#include <unistd.h>
#include <sys/socket.h>
#include <bluetooth/bluetooth.h>
#include <bluetooth/hci.h>
#include <bluetooth/hci_lib.h>

void print_beacon_info(uint8_t *data, size_t len) {
    if (len < 30) return;

    uint8_t ibeacon_prefix[] = {
        0x02, 0x01, 0x06,
        0x1A, 0xFF,
        0x4C, 0x00, 0x02, 0x15
    };

    if (memcmp(data, ibeacon_prefix, sizeof(ibeacon_prefix)) != 0) {
        return;
    }

    char uuid[37];
    snprintf(uuid, sizeof(uuid),
             "%02X%02X%02X%02X-%02X%02X-%02X%02X-%02X%02X-%02X%02X%02X%02X%02X%02X",
             data[9], data[10], data[11], data[12],
             data[13], data[14],
             data[15], data[16],
             data[17], data[18],
             data[19], data[20], data[21], data[22], data[23], data[24]);

    int major = (data[25] << 8) | data[26];
    int minor = (data[27] << 8) | data[28];
    int8_t tx_power = static_cast<int8_t>(data[29]);

    std::cout << "iBeacon Detected:\n";
    std::cout << "  UUID:  " << uuid << "\n";
    std::cout << "  Major: " << major << ", Minor: " << minor << "\n";
    std::cout << "  TX Power: " << static_cast<int>(tx_power) << " dBm\n";
}

int main() {
    int dev_id = hci_get_route(nullptr);
    if (dev_id < 0) {
        std::cerr << "No Bluetooth adapter found.\n";
        return 1;
    }
    else {
        std::cout << "Using Bluetooth adapter ID: " << dev_id << "\n";
    }

    int sock = hci_open_dev(dev_id);
    if (sock < 0) {
        std::cerr << "Failed to open Bluetooth device.\n";
        return 1;
    }
    else {
        std::cout << "Bluetooth device opened successfully.\n";
    }

    // Set BLE scan parameters
    int return_code = hci_le_set_scan_parameters(sock,
                                   0x01,              // active scanning
                                   htobs(0x0010),     // interval
                                   htobs(0x0010),     // window
                                   0x00,              // own address type
                                   0x00,              // filter policy
                                   1000);

    if (return_code < 0) {
        std::cerr << "Failed to set scan parameters.\n";
        std::cerr << "Retunr Code: " << return_code << "\n";
        perror("hci_le_set_scan_parameters");
        close(sock);
        return 1;
    }

    // Enable scanning
    if (hci_le_set_scan_enable(sock, 0x01, 0x00, 1000) < 0) {
        std::cerr << "Failed to enable scan.\n";
        close(sock);
        return 1;
    }

    std::cout << "Scanning BLE devices... Press Ctrl+C to stop.\n";

    uint8_t buf[HCI_MAX_EVENT_SIZE];
    while (true) {
        int len = read(sock, buf, sizeof(buf));
        if (len < 0) continue;

        evt_le_meta_event *meta = (evt_le_meta_event *)(buf + (1 + HCI_EVENT_HDR_SIZE));
        if (meta->subevent != EVT_LE_ADVERTISING_REPORT)
            continue;

        le_advertising_info *info = (le_advertising_info *)(meta->data + 1);
        char addr[18];
        ba2str(&info->bdaddr, addr);

        std::cout << "\nDevice: " << addr
                  << "  RSSI: " << static_cast<int8_t>(info->data[info->length]) << " dBm\n";

        print_beacon_info(info->data, info->length);
    }

    hci_le_set_scan_enable(sock, 0x00, 0x00, 1000); // disable scan
    close(sock);
    return 0;
}
