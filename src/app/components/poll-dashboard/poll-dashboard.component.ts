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
  public votes = {
    one: null,
    two: null,
    three: null,
  }
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get('poll').subscribe((e: any) => {
      this.items = e;
    })
  }

  showDescription(index?) {
    this.shown = index;
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
    const index = this.selected.indexOf(this.votes[number]);
    this.selected.splice(index, 1);
    this.votes[number] = null;
  }

  submit() {
    this.api.post('vote', this.votes).subscribe(e => {
      console.log(e)
    })
  }
}
