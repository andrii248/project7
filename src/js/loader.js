class Spiner {
   constructor(linkOnSpiner){
      this.spinerReady = false;
      this.spiner = document.querySelector(linkOnSpiner);
   }

   spinerStart(){
      this.spinerReady = false;
      setTimeout(()=>{
         this.spinerReady = true;
      }, 300);
      this.spiner.classList.add("spiner-to-go-js");
   }
   spinerEnd(){
      if(this.spinerReady){
         this.spiner.classList.remove("spiner-to-go-js");
      }
      else {
         setTimeout(()=>{
            this.spiner.classList.remove("spiner-to-go-js");
         }, 300);
      }
   }
}
const spiner = new Spiner("[data-spiner]");
export { spiner };