import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  standalone: true,
})
export class WebcamComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  constructor() { }

  ngOnInit(): void {
    this.startWebcam();
  }

  startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
      })
      .catch(err => {
        console.error("Error accessing webcam: ", err);
      });
  }

  takePhoto() {
    // Get the video element and canvas from DOM
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame on the canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to base64 image data
      const dataUrl = canvas.toDataURL('image/png');

      // Optionally, you can save the dataUrl or send it to a server
      console.log('Photo data URL:', dataUrl);
      
      // For now, let's just open the image in a new tab
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<img src="${dataUrl}" style="width: 100%;" />`;
      }
    }
  }

  importPhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Display the imported image in a new tab
        const newTab = window.open();
        if (newTab) {
          newTab.document.body.innerHTML = `<img src="${e.target.result}" style="width: 100%;" />`;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
