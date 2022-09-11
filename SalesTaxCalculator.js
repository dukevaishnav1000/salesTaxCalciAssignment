let inputarea=document.getElementsByClassName("inputArea");

let inputblock=document.getElementsByClassName("input");
let outputarea=document.getElementsByClassName("output");

var itemlines=[];
var numArray=[];
function submitted()
{ itemlines=[];
    numArray=[];
     if(syntaxChecking()){
        console.log("primary syntax validation passed ");
        taxCalci();
    
        outputarea[0].innerText=itemlines.join("\n");
        inputblock[0].style.display="none";
        outputarea[0].style.display="block";
     }  
     else
     alert("invalid input");    
}

function taxCalci(){
    let newlines=[];
    let temp;
    let st;
    let tsum=0;
    let it=0;
    let articleTotal=0;
    let salesTaxApplicable;
    let excludedlist=[" pill "," chocolate ","food ","medicine "," book "," books "," pills "," chocolates "];
    let currentPrice=1;
    itemlines.forEach(line=>{
        temp=line.split(" at ")[0]+" :";
        salesTaxApplicable=true;
        st=0;
        it=0;
        excludedlist.forEach(search=>{
            if(temp.includes(search))
            {
                salesTaxApplicable=false;
            }
        })

    if(salesTaxApplicable){
        st=numArray[currentPrice];
        st=st/10;
        tsum+=st;
    }
        if(temp.includes(" imported ")){
            it=numArray[currentPrice];
            it=it/20;
            tsum+=it;
        }
            
        temp=temp+((st+it+numArray[currentPrice]).toFixed(2));
        newlines.push(temp);
        articleTotal+=numArray[currentPrice];
        currentPrice+=2;
    })
    
    itemlines=newlines;

    console.log(itemlines);
    itemlines.push("Sales taxes: "+tsum.toFixed(2));
    itemlines.push("Total: "+(tsum+articleTotal).toFixed(2));
}


function syntaxChecking(){

    let rawinput=inputarea[0].value;
    console.log(rawinput);
    let x;
    rawinput.split("\n").forEach(input=>{     

        input.split(" ").forEach(element => {
            x=Number(element);
            if(!isNaN(x))
            {numArray.push(x);
            }
        });
        itemlines.push(input);
    })
    
    console.log(numArray);
    if(numArray.length==0 || numArray.length%2!=0){
        return false;
    }
    else
    return true;
}