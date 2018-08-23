<template>
  <div class="hello">
      <nav class="navbar navbar-expand-sm mt-5 mkBgDark">
        <div class="container">
          <div class="navbar-brand">JustPost</div>
            <div class="navbar-nav">  
              <div class="nav-item">
                <button class="btn mkBtnDark rounded-circle px-3" :data-target="try2" data-toggle="modal" alt="add post" style="font-size:25px;">+</button>
              </div> 
              <div class="nav-item ml-5">
                <input type="text" class="form-control" v-model="search"/>
              </div> 
              <div class="nav-item">
               <button class="btn btn-danger" @click="fillIt()" >Filter</button>
              </div> 
               <div class="nav-item ml-3">
                <button class="btn btn-danger" @click="badha()" >All</button>
              </div>
           </div>
        </div>
      </nav>
      <div class="container" v-for="(post , key ) in take2" :key="key">
        <div class="card mt-5">
          <div class="card-header mkBgDark">
            <button class="btn mkBtnDark float-right ml-2" data-target="#mod2" data-toggle="modal" @click="addModalKey(key)">edit</button>
            <button class="btn mkBtnDark float-right" @click="deleteIT(key)">Delete</button>
            <h2 class="card-title">{{ post.title }}</h2>
          </div>
          <div class="card-body">
            <h4>{{ post.descript}}</h4>
          </div>
          <div class="card-footer bg-white">
            <h4>{{ post.cat}}</h4>
          </div>
        </div>
        <div class="modal fade" id="mod2">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title">Edit Post</h1>
                <button class="btn text-white bg-dark float-right" style="color:white;" data-dismiss="modal">X</button>
              </div>
              <div class="modal-body">
                <form>
                    <div class="form-group">
                      <label>Title</label>
                      <input type="text" class="form-control" v-model="editTitle" />
                    </div>
                    <div class="form-group">
                      <label>Description</label>
                      <textarea type="text" v-model="editDescript" class="form-control" ></textarea>
                    </div>
                    <div class="card-footer">
                      <button type="button" class="btn btn-dark" @click="saveChanges()" data-dismiss="modal">Save Changes </button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" :id="try1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title">Add Post</h1>
              <button class="btn text-white bg-dark" style="color:white;" data-dismiss="modal">X</button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Title</label>
                <input tpye="text" v-model="title" class="form-control" placeholder="Title"/>
              </div>
              <div class="form-group">
                <label class="mt-3">Description</label>
                <textarea class="form-control" v-model="descript" type="text" placeholder="Description" cols="50"></textarea>
              </div>
              <div class="form-group">
                <label>Category</label>
                <select class="form-control" v-model="category">
                  <option>laptop</option>
                  <option>car</option>
                  <option>phone</option>
                  <option>house</option>
                </select>
              </div>
              <button class="btn btn-dark mx-auto mt-3" @click="uploadPost()" data-dismiss="modal">Submit</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title:'',
      descript:'',
      try1:"mod1",
      try2: "#mod1" ,
      postValue:[],
      modKey1:'',
      modKey2:'',
      keyValue:null,
      category:null,
      editTitle:null,
      editDescript:null,
      radhika:[],
      search:null,
      take1:[
        {
          name:'radhika',
          surname:'makwana'
        },
        {
          name:'harshdip singh',
          surname:'rathod'
        },  
        {
          name:'radhika',
          surname:'trivedi'
        },
        ],
      take2:[],
    }
  },  
  methods:{
    fillIt(){
      this.take2 = null,
      this.take2 = this.radhika.filter((val) => {
        return val.descript.match(this.search);
      })  
      console.log(this.take2);
      this.search = null;
    },
    badha(){
      this.take2 = null;
      this.search=null;
      this.take2 = this.radhika;
      console.log(this.take2);
    },
    uploadPost(){
      firebase.database().ref("post").push({title: this.title, descript: this.descript, cat : this.category})
      .then((data) =>{
        console.log(data)
      })
      ;
      this.descript =null;
      this.title = null;
    },
    addModalKey(key){
      console.log("----"+key+"----------");
      this.keyValue=key;
      this.editTitle=null;
      this.editDescript=null;
      this.editTitle=this.postValue[key].title;
      this.editDescript=this.postValue[key].descript;
      key=null;
    },
    saveChanges(){
      console.log(this.keyValue);
      firebase.database().ref("post/"+ this.keyValue).set({
        title: this.editTitle,
        descript:this.editDescript
      }) 
      this.keyValue=null
    },
    deleteIT(key){
      firebase.database().ref("post/" +key).remove();
    }
  },
  created(){
    firebase.database().ref("post").on('value',(snapshot)=>{
      this.postValue=snapshot.val();
      this.radhika = Object.values(this.postValue);
      this.take2 = this.radhika;
    })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mkBgDark{
  background:black;
  color:white;
  display:block;
}
h4{
  font-family: "Playfair Display";
}
.mkBtnDark:hover{
  display:block;
  background:black;
  border:1px solid white;
  color:white;
  
}
.mkBtnDark{
  background:white;
  font-weight:bold;
  border:1px solid white;
  color:black;
}
</style>
