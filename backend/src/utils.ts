export function random(len:number){
    const randomString="qwertyuioplkjhgfdsazxcvbnm1234560987";
    const randomLength=randomString.length;
    let ans="";
    for(let i=0;i<len;i++){
        ans+=randomString[Math.floor((Math.random() * randomLength))]
    }
    return ans;
}