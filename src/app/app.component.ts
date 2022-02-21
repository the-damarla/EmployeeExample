import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fetchProject';
  li:any;
  lis=[];
  constructor(private http : HttpClient){}
  getSearchedEmployees(text:any)
  {
    var cur = 0
    let elements = document.querySelectorAll(".employee-name");
    let flag = 0
    elements.forEach((element) => 
    {
        if (element.innerHTML.includes(text.toUpperCase()))
        {
          document.getElementById('empDiv'+cur)!.style.display="inherit"
          flag++;
        } 
        else 
        {
          document.getElementById('empDiv'+cur)!.style.display="none"
        }
        cur++
    });
    document.getElementById('showError')!.style.marginTop = "10px"
    document.getElementById('showError')!.style.color = "red"
    if(flag == 0)
    {
      document.getElementById('showError')!.style.display = "inherit"
      document.getElementById('showError')!.innerHTML = "* Nothing TO Show *"
    }
    else{
      document.getElementById('showError')!.style.display = "none"
    }
  }
 
  ngOnInit(): void {
    this.http.get('http://www.mocky.io/v2/5ea172973100002d001eeada').subscribe(Response => {
      if(Response){ 
        hideloader();
      }
      console.log(Response)
      this.li=Response;
      this.lis=this.li.list;
      listOfFetchedDetails(this.lis)
    });

    function hideloader(){
      document.getElementById('load')!.style.visibility='hidden'
    }

    const searchtext = document.getElementById('goSearch')

    searchtext?.addEventListener('click',(e)=>{
      let inputValue = (document.getElementById('searchText') as HTMLInputElement).value.trim();
    })


    function listOfFetchedDetails(lis:any)
    {
      var flag = 0;
      for (let i of lis) {
  
        let card = document.createElement("div");
        let pos = i.name.replace(/\s+/g, '').toUpperCase()
        card.classList.add("card", pos);
        console.log("classList : " + card.classList)

        card.setAttribute("id","empDiv" + flag)

        let container = document.createElement("div");
        container.classList.add("container");

        let eName = document.createElement("h1");
        eName.classList.add("employee-name");
        eName.innerHTML = "<b>" + i.name + "</b>";
        container.appendChild(eName);

        let salary = document.createElement("p");
        salary.innerHTML = "<b>Salary : </b>" + " " + i.salary;
        container.appendChild(salary);

        let position = document.createElement("p");
        position.innerHTML = "<b>position : </b>" + " " + i.position;
        container.appendChild(position);
        
        card.appendChild(container);
        document.getElementById("employeeCard")!.appendChild(card);

        // divCreator(i)
        document.getElementById('empDiv'+flag)!.style.border = "2px solid black"
        document.getElementById('empDiv'+flag)!.style.margin = "5px"
        document.getElementById('empDiv'+flag)!.style.textAlign = "center"
        document.getElementById('empDiv'+flag)!.style.boxShadow = "2px 5px 10px 5px skyblue"
        // textAdder(i,"Name : ",lis[i]['name'])
        // textAdder(i,"Office : ",lis[i]['office'])
        // textAdder(i,"position : ",lis[i]['position'])
        // textAdder(i,"Salary : ",lis[i]['salary'])
        flag++;
      }
    }

    var divCreator=function (id: any){
      const newElement=document.createElement("div");
      newElement.className="singleCard"
      const newNode=document.getElementById('employeeCard')!.appendChild(newElement);
      newNode.setAttribute("id",'div'+id);
    }
  
    var textAdder = function(id: any, attribute: any, text:any) {
      const target = document.getElementById('div'+id)
      target!.appendChild(document.createTextNode(attribute));
      target!.innerHTML += "<b>" + text + "</b>"
      target!.innerHTML += "<br>"
    }
  }
}
