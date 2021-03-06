import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {B10ArticlesService} from "../b10-articles.service";
import {B10HeaderComponent} from "../b10-header/b10-header.component";
declare var firebase: any;
declare var $: any;


@Component({
  selector: 'app-b10-article',
  templateUrl: './b10-article.component.html',
  styleUrls: ['./b10-article.component.css']
})
export class B10ArticleComponent implements OnInit {

  title: string;
  bgLight: string;
  bgMed: string;
  bgDark: string;
  color: string;
  image: string;

  constructor(private route: ActivatedRoute, private articlesService: B10ArticlesService){

  }

  ngOnInit(){

    this.articlesService.getArticle(this.route.snapshot.params['article'],
      (article) => {

        this.bgLight = article.bgColorLight;
        this.bgMed   = article.bgColorMed;
        this.bgDark  = article.bgColorDark;
        this.color   = article.color;
        B10HeaderComponent.paint(this.color);
        this.title = article.title;

        firebase.storage().ref().child(article.article).getDownloadURL().then(
          (url) => {
            $("#content").load(url);
          }
        ).catch(
          (error) => {
            console.dir(error);
          }
        );

        firebase.storage().ref().child(article.image).getDownloadURL().then(
          (url) => {
            this.image = url;
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );

      }
    );
  }

}
