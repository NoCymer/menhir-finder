import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class WebcamComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  capturedImage: string | null = null;
  showScanButton: boolean = false; // Nouvelle propriété

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
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png');
      this.stopWebcam();
      this.showScanButton = true; // Afficher le bouton scan
    }
  }

  importPhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.capturedImage = e.target.result;
        this.stopWebcam();
        this.showScanButton = true; // Afficher le bouton scan
      };
      reader.readAsDataURL(file);
    }
  }

  stopWebcam() {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    this.videoElement.nativeElement.srcObject = null;
  }

  startScan() {
    console.log('Scan started'); // Implémentez la logique du scan ici
  }
}
