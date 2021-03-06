import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from '../article.model'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  article: Article;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.getArticle(params['articleId']);
    });
  }

  getArticle(id:string):void {
    this.articlesService.getArticle(id).subscribe(
      (response:any)=>{
        this.article = response.article;
      }
    );
  }

  deleteArticle(id:string): void {
    if (confirm("Are you sure to delete " + this.article.title)) {
      this.articlesService.deleteArticle(id).subscribe(
        () => { this.router.navigate(['/articles']) }
      );
    }
  }

}
