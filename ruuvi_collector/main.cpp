#include <iostream>
#include <iomanip>
#include <cstring>
#include <unistd.h>
#include <sys/socket.h>
#include <bluetooth/bluetooth.h>
#include <bluetooth/hci.h>
#include <bluetooth/hci_lib.h>

void print_beacon_info(uint8_t *data, int len) {
    // Example: parse iBeacon (Apple format)
    if (len < 30) return; // minimal length check

    uint8_t ibeacon_prefix[] = {
        0x02, 0x01, 0x06,
        0x1A, 0xFF,
        0x4C, 0x00, 0x02, 0x15
    };

    if (memcmp(data, ibeacon_prefix, sizeof(ibeacon_prefix)) != 0) {
        return; // Not an iBeacon
    }

    char uuid[37];
    snprintf(uuid, sizeof(uuid),
             "%02X%02X%02X%02X-%02X%02X-%02X%02X-%02X%02X-%02X%02X%02X%02X%02X%02X",
             data[9], data[10], data[11], data[12],
             data[13], data[14],
             data[15], data[16],
             data[17], data[18],
             data[19], data[20], data[21], data[22], data[23], data[24]);

    int16_t major = (data[25] << 8) + data[26];
    int16_t minor = (data[27] << 8) + data[28];
    int8_t tx_power = (int8_t)data[29];

    std::cout << "iBeacon Detected:\n";
    std::cout << "  UUID:  " << uuid << "\n";
    std::cout << "  Major: " << major << ", Minor: " << minor << "\n";
    std::cout << "  TX Power: " << (int)tx_power << " dBm\n";
}

int main() {
    int device_id = hci_get_route(nullptr);
    if (device_id < 0) {
        std::cerr << "Error: No Bluetooth device found.\n";
        return 1;
    }

    int sock = hci_open_dev(device_id);
    if (sock < 0) {
        std::cerr << "Error: Cannot open HCI device.\n";
        return 1;
    }

    // Set BLE scan parameters
    le_set_scan_parameters_cp scan_params = { 0x01, htobs(0x10), htobs(0x10), 0x00, 0x00, 0x00 };
    if (hci_le_set_scan_parameters(sock, &scan_params, 1000) < 0) {
        std::cerr << "Error: Cannot set scan parameters.\n";
        close(sock);
        return 1;
    }

    if (hci_le_set_scan_enable(sock, 0x01, 0x00, 1000) < 0) {
        std::cerr << "Error: Cannot enable scan.\n";
        close(sock);
        return 1;
    }

    std::cout << "Scanning BLE devices (Ctrl+C to stop)...\n";

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
                  << "  RSSI: " << (int8_t)info->data[info->length] << " dBm\n";

        print_beacon_info(info->data, info->length);
    }

    hci_le_set_scan_enable(sock, 0x00, 0x00, 1000); // disable scan
    close(sock);
    return 0;
}
