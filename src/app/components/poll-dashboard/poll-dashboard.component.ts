import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'poll-dashboard',
  templateUrl: './poll-dashboard.component.html',
  styleUrls: ['./poll-dashboard.component.scss']
})
export class PollDashboardComponent implements OnInit {
  public items = [];
  public selected = [];
  public shown = null;
  public meetingId = '';
  public meeting = null;
  public user = '';
  public votes = {
    one: null,
    two: null,
    three: null,
  }
  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  submitMeetingId() {
    this.api.get('meeting', this.meetingId).subscribe((e: any) => {
      this.meeting = e;
      this.items = e.pitches;
    });
  }

  showDescription(index?) {
    this.shown = index;
    console.log(this.shown)
  }

  vote(number, id) {
    if (this.votes['one'] && this.votes['one'].id === id) this.votes['one'] = null;
    if (this.votes['two'] && this.votes['two'].id === id) this.votes['two'] = null;
    if (this.votes['three'] && this.votes['three'].id === id) this.votes['three'] = null;

    const found = this.selected.indexOf(this.votes[number]);
    if (found > -1) {
      this.selected.splice(found, 1);
    }
    this.votes[number] = this.items.find(item => item.id === id);
    this.selected.push(id);
  }

  remove(number) {
    const index = this.selected.indexOf(this.votes[number].id);
    this.selected.splice(index, 1);
    this.votes[number] = null;
  }

  submit() {
    this.api.post('vote', {votes: this.votes, user: this.user, meetingId: this.meetingId}).subscribe(e => {
      console.log(e)
    })
  }
}
