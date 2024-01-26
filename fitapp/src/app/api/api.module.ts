import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { siteUrl, header, apiUrlList, addHeader, updateHeader, uploadFileHeader } from "../envirorment/envirorment";
import { Observable } from 'rxjs';
import axios from 'axios';
import { Gym, User } from '../classes/user';

declare var require: any


class Header {
  public header: any;
  constructor(headerSet: HttpHeaders | undefined) {
    this.header = {
      headers: headerSet
    }
  }
}


@NgModule({
  
})
@Injectable()
export class APIModule {
  constructor(private http: HttpClient) { }
  registerUser(item: User): any {
    var data = {
      name: item.name ? item.name : "",
      surname: item.surname ? item.surname : "",
      email: item.email ? item.email : "",
      address: item.address ? item.address : "",
      country: item.country ? item.country : "",
      region: item.region ? item.region : "",
      birthday: item.birthdate ? item.birthdate : "",
      pass: item.password ? item.password : "",
      postalCode: item.postalCode ? item.postalCode : "",
      city: item.city ? item.city : "",
      gender: item.gender ? item.gender : "",
      isTrainer: item.isTrainer ? item.isTrainer : false,
      idGym: item.idGym ? item.idGym : -1
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/registerUser", data, headerRQS.header);
  }

  registerGym(item: Gym): any {
    var data = {
      name: item.name ? item.name : "",
      address: item.address ? item.address : "",
      country: item.country ? item.country : "",
      region: item.region ? item.region : "",
      postalCode: item.postalCode ? item.postalCode : "",
      city: item.city ? item.city : "",      
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/registerGym", data, headerRQS.header);
  }


  updateGym(item: Gym): any {
    var data = {
      id:item.id?item.id:-1,
      name: item.name ? item.name : "",
      address: item.address ? item.address : "",
      country: item.country ? item.country : "",
      region: item.region ? item.region : "",
      postalCode: item.postalCode ? item.postalCode : "",
      city: item.city ? item.city : "",      
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/updateGym", data, headerRQS.header);
  }

  updateUser(item: User): any {
    var data = {
      id:item.id?item.id:-1,
      name: item.name ? item.name : "",
      surname: item.surname ? item.surname : "",
      address: item.address ? item.address : "",
      country: item.country ? item.country : "",
      region: item.region ? item.region : "",
      password: item.password ? item.password : "",
      postalCode: item.postalCode ? item.postalCode : "",
      city: item.city ? item.city : ""
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/updateUser", data, headerRQS.header);
  }

  checkUser(email: string): any {
    var data = {
      email: email ? email : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/checkUser", data, headerRQS.header);
  }

  deleteUser(id: string): any {
    var data = {
      id: id ? id : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/deleteUser", data, headerRQS.header);
  }

  login(email: string, password: string): any {
    var data = {
      email: email ? email : "",
      pass: password ? password : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/login", data, headerRQS.header);
  }

  getGym(id: string): any {
    var data = {
      id: id ? id : -1,
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getgym", data, headerRQS.header);
  }















  

  addSource(source: any): any {
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/addSource", source, headerRQS.header);
  }

  addArticle(article: any): any {
    var data = {
      datepublished: article.dataPubblicazione ? article.dataPubblicazione : "",
      datemodified: article.dataModifica ? article.dataModifica : "",
      metadata: article.metadata ? JSON.stringify(article.metadata) : "",
      status: article.status ? "true" : "false",
      statusText: article.statusText ? article.statusText : "",
      source: article.source ? article.source : "",
      url: article.url ? article.url : ""
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/addArticle", data, headerRQS.header);
  }

  addImage(image: any,code:string): any {
    var data = {
      datecrated: image.dataPubblicazione ? image.dataPubblicazione : "",
      datemodified: image.dataModifica ? image.dataModifica : "",
      metadata: image.metadata ? JSON.stringify(image.metadata) : "",
      code: code ? code : "",
      similar:  image.pagesWithMatchingImages ? JSON.stringify(image.pagesWithMatchingImages) : "",
      labels:  image.imageLabels ? JSON.stringify(image.imageLabels) : "",
      racy:  image.safeSearchAnnotation.racy ? image.safeSearchAnnotation.racy : "",
      violence:  image.safeSearchAnnotation.violence ? image.safeSearchAnnotation.violence : "",
      spoof:  image.safeSearchAnnotation.spoof ? image.safeSearchAnnotation.spoof : "",
      medical:  image.safeSearchAnnotation.medical ? image.safeSearchAnnotation.medical : "",
      adult:  image.safeSearchAnnotation.adult ? image.safeSearchAnnotation.adult : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/addImage", data, headerRQS.header);
  }

  checkArticle(url: string): any {
    var data = {
      url: url ? url : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/checkArticle", data, headerRQS.header);
  }

  checkImage(code: string): any {
    var data = {
      code: code ? code : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/checkImage", data, headerRQS.header);
  }
  checkSource(source: string): any {
    var data = {
      source: source ? source : "",
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/checkSource", data, headerRQS.header);
  }

  checkIsBlocked(source: string, utente: number): any {
    var data = {
      source: source ? source : "",
      utente: utente ? utente : -1,
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/checkIsBlocked", data, headerRQS.header);
  }

  unblockedMySource(source: string, utente: number): any {
    var data = {
      source: source ? source : "",
      utente: utente ? utente : -1,
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/unblockedMySource", data, headerRQS.header);
  }

  getMyBlockedSource(utente: number): any {
    var data = {
      utente: utente ? utente : -1,
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getMyBlockedSource", data, headerRQS.header);
  }

  getArticle(url: any): any {
    var data = {
      url: url ? url : ""
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getArticle", data, headerRQS.header);
  }


  getImage(code: any): any {
    var data = {
      code: code ? code : ""
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getImage", data, headerRQS.header);
  }

  getSource(source: string): any {
    var data = {
      source: source ? source : ""
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getSource", data, headerRQS.header);
  }

  blockSourceForUser(source: string, user: number): any {
    var data = {
      id_fonte: source ? source : "",
      id_utente: user ? user : -1
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/blockSourceForUser", data, headerRQS.header);
  }

  getMetaArticle(url: string): any {
    var data = {
      url: url ? url : ""
    };
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getMetaAtricle", data, headerRQS.header);
  }

  verifyArticle(url: string): Observable<any> {
    let apiUrl = 'https://api.openai.com/v1/completions'; // Aggiorna con l'URL corretto dell'API di OpenAI GPT-3
    let apiKey = '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';
    const prompt = `L'articolo all'URL ${url} è una notizia vera?`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const body = {
      "model": "text-davinci-003",
      'prompt': prompt,
      'max_tokens': 2000
    };

    return this.http.post<any>(apiUrl, body, { headers });
  }

  async verifyImageAuthenticity(imageUrl: string) {
    var headerRQS: Header = new Header(header);

    if(imageUrl.indexOf("base64")>=0){
      imageUrl = imageUrl.replaceAll(imageUrl.split(',')[0]+",","")
      try {
        const apiKey = 'AIzaSyDCCEBX3R64amB7EJNVlT3CXrE0W6Ckjj0'; // Replace with your actual API key
        const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  
        const requestData = {
          requests: [
            {
              image: {
                content: imageUrl,
              },
              features: [
                {
                  type: 'WEB_DETECTION',
                  maxResults: 5,
                },
                {
                  type: 'SAFE_SEARCH_DETECTION'
                },
              ],
            },
          ],
        };
  
        const response = await axios.post(url,requestData, headerRQS.header);
        return response;  
        
      } catch (error) {
        return({'Error': error});
      }
    }
    else{
      try {
        const apiKey = 'AIzaSyDCCEBX3R64amB7EJNVlT3CXrE0W6Ckjj0'; // Replace with your actual API key
        const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  
        const requestData = {
          requests: [
            {
              image: {
                source: {
                  imageUri: imageUrl,
                },
              },
              features: [
                {
                  type: 'WEB_DETECTION',
                  maxResults: 5,
                },
                {
                  type: 'SAFE_SEARCH_DETECTION'
                },
              ],
            },
          ],
        };
  
        const response = await axios.post(url, requestData, headerRQS.header);  
        return response;  
      } catch (error) {
        return({'Error': error});
      }
    }
   

  }

  async verifiyImageMetadata(imageUrl:string){

      //imageUrl = imageUrl.replaceAll(imageUrl.split(',')[0]+",","")
      try {
        const requestData = {
              image: imageUrl,            
              filename: "tmp.png"
        };
        let response:any=[];
        let resp:any=[];
        
        var headerRQS: Header = new Header(header);
        if(imageUrl.indexOf("https")>=0 || imageUrl.indexOf("base64")>=0 || imageUrl.indexOf("http")>=0)      
          resp = await this.http.post<any>(apiUrlList + "/exif", requestData, headerRQS.header).toPromise();
        else
          resp = await this.http.post<any>(apiUrlList + "/exiflocal", requestData).toPromise();
        let keys = Object.keys(resp.metadati[0])
        keys.forEach((name:string) => {
          if(name != "SourceFile" && name != "Directory" && name!="FileName"){
            let content = resp.metadati[0][name] as string;
            response.push({ name, content });
          }
        });

       return response;

      }catch(error){
        console.log(error)
      }
  }
  

  verifySource(url: string): Observable<any> {
    let apiUrl = 'https://api.openai.com/v1/completions'; // Aggiorna con l'URL corretto dell'API di OpenAI GPT-3
    let apiKey = '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';
    const prompt = `La fonte dell'URL ${url} è affidabile?`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const body = {
      "model": "text-davinci-003",
      'prompt': prompt,
      'max_tokens': 2000
    };

    return this.http.post<any>(apiUrl, body, { headers });
  }

  verifyFreeText(freeText: string): Observable<any> {
    let apiUrl = 'https://api.openai.com/v1/completions'; // Aggiorna con l'URL corretto dell'API di OpenAI GPT-3
    let apiKey = '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';
    const prompt = `${freeText} è vero o falso?`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };

    const body = {
      "model": "text-davinci-003",
      'prompt': prompt,
      'max_tokens': 4
    };

    return this.http.post<any>(apiUrl, body, { headers });
  }

  addReport(item: any): any {
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/addReport", item, headerRQS.header);
  }

  getReportResult(item: any): any {
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getReportResult", item, headerRQS.header);
  }

  getReportSource(item: any): any {
    var headerRQS: Header = new Header(header);
    return this.http.post(apiUrlList + "/getReportSource", item, headerRQS.header);
  }

}