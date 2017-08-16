export class PlayList{
    name:string;
    imageUrl:string;
    id:string;
    tracksUrl:string;

    constructor(obj?:any){
      this.name = obj && obj.name || null;
      this.id = obj && obj.id || null;
      this.imageUrl = obj && obj.imageUrl || null;
      this.tracksUrl = obj && obj.tracksUrl || null;
    }
  }