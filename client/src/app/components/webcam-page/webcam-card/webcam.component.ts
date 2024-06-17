import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GuessService } from '../../../services/Guess.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss'],
  standalone: true
})
export class WebcamComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  capturedImage: string | null = null;
  showScanButton: boolean = false; // Nouvelle propriété

  constructor(
    public guessService: GuessService
  ) {}

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

      // convert to binary
      var blobBin = atob(this.capturedImage.split(',')[1]);
      var array = [];
      for(var i = 0; i < blobBin.length; i++) {
          array.push(blobBin.charCodeAt(i));
      }
      
      this.guessService.makeGuessFromPicture(
        new File(
          [new Blob([new Uint8Array(array)])],
          "upload.png",
          {
            type: 'image/png'
          }
        )
      );
      
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
