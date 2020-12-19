import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public group = null;
  public meetings = [];
  public shown = null;
  public votes = {};
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get('results', 'a1b2c3').subscribe((e: any) => {
      this.group = e.group;
      this.meetings = e.meetings;
    });
  }

  show(id) {
    this.shown = this.shown === id ? null : id;
    const meeting = this.meetings.find(meeting => meeting._id === id);
    const votes = {};
    Object.keys(meeting.votes).forEach(key => {
      const { one, two, three } = meeting.votes[key];
      if (votes[one.id]) {
        votes[one.id] += 1;
      } else {
        votes[one.id] = 1;
      }
      if (votes[two.id]) {
        votes[two.id] += 2;
      } else {
        votes[two.id] = 2;
      }
      if (votes[three.id]) {
        votes[three.id] += 3;
      } else {
        votes[three.id] = 3;
      }
    });
    this.votes = votes;

  }

}
