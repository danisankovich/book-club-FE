import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'book-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public list = [];
  public shown = null;
  public searchTerm = '';
  submitter = '';
  meetingId = '';
  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  search() {
    this.list = [];
    this.api.get('search', this.searchTerm).subscribe((e: any) => {
      this.list = e.books;
    })
  }

  showBook(item) {
    this.shown = item;
  }

  close() {
    this.shown = null;
  }

  pitch(item) {
    const bookInfo = {
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors.join(', '),
      thumbnail: item.volumeInfo.imageLinks.thumbnail,
      description: item.volumeInfo.description,
      user: this.submitter,
      meetingId: this.meetingId,
    }
    const confirmed = confirm(`Do you wish to submit ${bookInfo.title} for the next meeting? This will overwrite any previous submission you made.`)
    if (confirmed) {
      this.api.post('pitch', bookInfo).subscribe((e: any) => {
        console.log(e);
      });
    }
  }

}
