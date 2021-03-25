import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../articles.service';
import { Article } from '../article.model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  articles: Article;

  constructor(private articlesService: ArticlesService) { }

  // 6. Make a call to the service on initialization
  ngOnInit() {
    this.getArticles();
  }

  // 5. Create a local wrapper for
  getArticles(): void {
    this.articlesService.getArticles().subscribe(
      (response:any) => {
        this.articles = response.articles

      }
    );
  }

}
