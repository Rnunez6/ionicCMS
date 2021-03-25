import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticlesService } from '../articles.service';
import { Article } from '../article.model'; 


@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.page.html',
  styleUrls: ['./article-create.page.scss'],
})
export class ArticleCreatePage implements OnInit {

  article:Article = new Article();
  errors: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService,
    private router: Router
  ) { }

  ngOnInit() {}

  response(response): void{

    if(response.success===false){

      if( response.errors.name == 'MissingArticleTitleError' ){
        this.errors.title = 'Please enter a title';
      }

      if( response.errors.name == 'UserExistsError' ){
        this.errors.description = 'Please enter a description or an article with the given description already exist.';
      }

    }

    if(response.success===true){
      this.router.navigate(['/articles']);
    }
  }

  onSubmit(): void{
    this.articlesService.createArticle(this.article).subscribe(
      (response:any) => {
        this.response(response);
      }
    );
  }


}
