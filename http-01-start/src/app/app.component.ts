import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './Post.model';
import {PostService} from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching=false;
  constructor(private http: HttpClient ,
    private postService:PostService) {}

  ngOnInit() {
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(
      post=>{
        this.isFetching=false;
        this.loadedPosts=post;
      }
    )
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createAndStorePost(postData.title , postData.content);

  }

  onFetchPosts() {
    this.isFetching=true;
    this.postService.fetchPosts().subscribe(
      post=>{
        this.isFetching=false;
        this.loadedPosts=post;
      }
    )
   
    // Send Http request
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(()=>{
      this.loadedPosts=[];
    })
    // Send Http request
  }
  
}
