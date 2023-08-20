import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ArduinoUSBReadApp';

  navigator = window.navigator as any;

  ngOnInit() {
    // this.navigator.serial.getPorts().then((ports: any) => {
    //   // Initialize the list of available ports with `ports` on page load.
    //   console.log(ports);
      
    // });
    // this.onclick();
  }

  async onclick() {

    // console.log('here');
    
    // Filter on devices with the Arduino Uno USB Vendor/Product IDs.
    const filters = [
      { usbVendorId: 1027, usbProductId: 24597 }
    ];

    // Prompt user to select an Arduino Uno device.
    const port = await this.navigator.serial.requestPort({filters});

    // Wait for the serial port to open.
    await port.open({ baudRate: 9600 });
    
    console.log(port.getInfo());

    // const textDecoder = new TextDecoderStream();
    // const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    // const reader = textDecoder.readable.getReader();
    
    while (port.readable) {
      const reader = port.readable.getReader();
      
    
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
          }
          if (value) {
            console.log(value);
            const blob = new Blob([value]);

            // set chunk size of 1024 bytes
            const stream = blob.stream();
            console.log(stream);
            
          }
        }
      } catch (error) {
        // TODO: Handle non-fatal read error.
        // console.log(error);
        
      }
    }
  }

}
