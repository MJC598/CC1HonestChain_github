var countmismatch = 0;
var countundecided = 0;
var countmatch = 0;

function zip() {
    var args = [].slice.call(arguments);
    var shortest = args.length==0 ? [] : args.reduce(function(a,b){
        return a.length<b.length ? a : b
    });

    return shortest.map(function(_,i){
        return args.map(function(array){return array[i]})
    });
}

var tempArray = zip(templist, d)

tempArray.array.forEach(element => {
    var a = element[0];
    var b = element[1];
    if(a == 'Yes' && (b == 'R' || b == null)){
        countmatch++;
    }
    else if(a == 'No' && b == 'R'){
        countmismatch++;
    }
    else if(a == 'No' && b == null){
        countmatch++;
    }
    else if(a == 'Uncertain' && b == 'R'){
        countundecided++;
    }
    else if(a == 'Uncertain' && b == null){
        countmatch++;
    }
});

var n = 14;
var alpha_c = Math.floor(countmatch + ((countundecided*countmatch)/(countmatch+countmismatch)));
var beta_c = n - alpha_c;
var ei = float(alpha_c + 1)/float(alpha_c + beta_c + 2);
// console.log('Beta model is ' + ei);

var a = 0.7
var eb = float(countmatch+1.0)/float(countmatch+countmismatch+countundecided+3.0);
var eu = float(countundecided+1.0)/float(countmatch+countmismatch+countundecided+3.0);
var ew = (eb + a*eu);
var rEw = Math.log(ew)/Math.log((1-ew));
var wi = 0;
// console.log('rEw: ' + rEw);
if(rEw > 0){
    wi = 1 - Math.exp(-(Math.abs(rEw)));
}
else if(rEw < 0){
    wi = -(1 - Math.exp(-(Math.abs(rEw))));
}
else{
    wi = 0;
}
// console.log('dirichlet model is ' + wi);

