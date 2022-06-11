class Spiner {
   constructor(linkOnSpiner){
      this.spiner = document.querySelector(linkOnSpiner);
   }

   spinerStart(){
      this.spiner.classList.add("spiner-to-go-js");
      console.log(2);
   }
   spinerEnd(){
      this.spiner.classList.remove("spiner-to-go-js");
   }
}
