import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { PostService } from './post.service';
declare let alertify: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute,
    private alertifyService: AlertifyService, private postService: PostService
    ) {}

  path: string = 'https://jsonplaceholder.typicode.com/';
  posts: Post[];
  users: User[];
  filterText: string;
  today = new Date(2021,7,4)


  ngOnInit() {
    this.getUsers();
    this.activatedRoute.params.subscribe(params => { /* Aktif edilmiş route un parametrelerine abone ol demek */
      this.getPosts(params['userid']);
    }) ;
  }

  getPosts(userid) {/* postlarda userid varsa ona göre getirecek. */
      this.postService.getPosts(userid).subscribe(data => {
      this.posts = data;
    });
  }
  getUsers() {
    this.http.get<User[]>(this.path + 'users').subscribe((response) => {
      this.users = response;
    });
  }

  addToFavorites(post) {
    this.alertifyService.success('Added to favs:' + post.title);
  }
}
