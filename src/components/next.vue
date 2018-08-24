
  <template>
    <div class="hello">

        <hr>
  
          <div class="container">
                    <button class="btn btn-danger float-left ml-5 rounded-circle px-3" data-toggle="modal" data-target="#modal1" style="font-size:25px;">+</button>
                <div> 
                    <button class="btn btn-danger px-3 mr-3 mt-3" @click="changeCar()">Car</button>
                    <button class="btn btn-danger px-3 mr-3 mt-3" @click="changeBus()">bus</button>
                    <button class="btn btn-danger px-3 mr-3 mt-3" @click="changeBike()">bike</button>
                    <button class="btn btn-danger px-3 mr-3 mt-3" @click="All()">All</button>
                </div>
          </div>
        <hr>  
        <div class="container">
        <div class="modal fade" id="edit">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title">Edit Post</h1>
                      <button class="btn btn-danger" data-dismiss="modal">X</button>
                  </div>
                 <div class="modal-body">
                    <div class="form-group">
                        <label>Uname</label>
                        <input type="text" class="form-control" v-model="editUname"/>
                    </div>
                    <div class="form-group">
                        <label>Info</label>
                        <input type="text" class="form-control" v-model="editInfo"/>
                    </div>
                 </div>
                 <div class="modal-footer">
                     <button class="btn btn-danger" data-dismiss="modal" @click="change()">Save Changes</button>
                 </div>
              </div>
          </div>
       </div>
          <div class="modal fade" id="modal1">
              <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title">
                                Add Post
                            </div>
                              <button class="btn btn-danger" data-dismiss="modal">X</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" placeholder="enter Name" class="form-control" v-model="uname"/>
                            </div>
                            <div class="form-group">
                                <label>info</label>
                                <textarea cols="50" type="text" placeholder="enter the information" class="form-control" v-model="info"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <select v-model="select" class="form-control">
                                    <option>car</option>
                                    <option>bike</option>
                                    <option>bus</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-danger" @click="addPost() " data-dismiss="modal">Add</button>
                        </div>
                  </div>
              </div>
          </div>
          <div class="container">
                    <div class="row">
                        <div  class="col-lg-4" v-if="toggleBike" v-for="(bb,key1) in bike" :key="key1">
                            <div class="card mt-5">
                                <div class="card-header bg-secondary text-white">
                                    <p class="card-title">{{ bb.uname }}</p>
                                </div>
                                <div class="card-body">
                                    <h4>{{ bb.info }}</h4><hr>
                                    <h4>{{ bb.select }}</h4>
                                </div>
                                <div class="card-footer">
                                <button class="btn btn-secondary" @click="remBike(key1)">Remove</button> 
                                <button class="btn btn-secondary"  data-toggle="modal" data-target="#edit" @click="editBike(key1)">Edit</button>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4" v-if="toggleCar" v-for="(bb,key2) in car" :key="key2">
                            <div class="card mt-5">
                                <div class="card-header bg-info text-white">
                                    <p class="card-title">{{ bb.uname }}</p>
                                </div>
                                <div class="card-body">
                                    <h4>{{ bb.info }}</h4><hr>
                                    <h4>{{ bb.select }}</h4>
                                </div>
                                <div class="card-footer">
                                <button class="btn btn-info" @click="remCar(key2)">Remove</button>
                                <button class="btn btn-info" data-toggle="modal" data-target="#edit" @click="editCar(key2)">Edit</button>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div  class="col-lg-4" v-if="toggleBus" v-for="(bb,key3) in bus" :key="key3">
                            <div class="card mt-5">
                                <div class="card-header bg-dark text-white">
                                    <p class="card-title">{{ bb.uname }}</p>
                                </div>
                                <div class="card-body">
                                    <h4>{{ bb.info }}</h4><hr>
                                    <h4>{{ bb.select }}</h4>
                                </div>
                                <div class="card-footer">
                                <button class="btn btn-dark" @click="remBus(key3)">Remove</button>
                                <button class="btn btn-dark" data-toggle="modal" data-target="#edit" @click="editBus(key3)">Edit</button>  
                                </div>
                            </div>
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
          select:null,
          info:null,
          uname:null,
          car:[],
          bike:[],
          bus:[],
          keyValue:null,
          editUname:null,
          editInfo:null,
          editSelect:null,
          gotSelect:null,
          gotKey:null,
          toggleBus:true,
          toggleCar:true,
          toggleBike:true,
      }
    },  
    methods:{
        change(){
           console.log(this.editSelect);
           console.log(this.keyValue);
           firebase.database().ref(this.editSelect +"/"+ this.keyValue).set({
               uname: this.editUname,
               info: this.editInfo,
               select: this.editSelect,
           })
            this.keyValue=null;
            this.editSelect= null;
            this.editInfo= null;
            this.editUname= null;

        },
        editBus(key3){
            this.editSelect= this.bus[key3].select;
            this.editInfo= this.bus[key3].info;
            this.editUname= this.bus[key3].uname;
            this.keyValue=key3;

        }, 
        changeBus(){
            this.toggleCar = false;
            this.toggleBike =false;
            this.toggleBus=true;
        },
        changeBike(){
            this.toggleCar = false;
            this.toggleBus =false;
            this.toggleBike= true;
        },
        changeCar(){
            this.toggleCar=true;
            this.toggleBus = false;
            this.toggleBike =false;
        },
        editCar(key2){
            this.editSelect= this.car[key2].select;
            this.editInfo= this.car[key2].info;
            this.editUname= this.car[key2].uname;
                     this.keyValue=key2;
          
        },
         editBike(key1){
            this.editSelect= this.bike[key1].select;
            this.editInfo= this.bike[key1].info;
            this.editUname= this.bike[key1].uname;
                    this.keyValue=key1;
        },
        remBike(key1){
            console.log("removing bike "+ key1);
            firebase.database().ref("bike/" + key1).remove();
        },
        remCar(key2){
            console.log("removing" + key2);
          firebase.database().ref("car/" + key2).remove();
          key2=null;
        },
        remBus(key3){
            console.log("removing bus" + key3);
            firebase.database().ref("bus/" + key3).remove();
            key3=null;
        },
        All(){
             this.toggleCar=true;
            this.toggleBus=true;
            this.toggleBike=true;
        },
     addPost(){
            firebase.database().ref(this.select).push({uname: this.uname ,info : this.info , select: this.select})
            .then((data)=>{
                console.log(data)
            })
              All();
            this.select=null;
            this.uname=null;
            this.info=null;
         
         console.log("done")
      }
    },
    created(){
        firebase.database().ref("car").on('value',(snapshot)=>{
            this.car=snapshot.val();
        })
        firebase.database().ref("bike").on("value",(snapshot)=>{
            this.bike=snapshot.val();
        })
        firebase.database().ref("bus").on("value",(snapshot)=>{
            this.bus=snapshot.val();
        })
    }
}
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .mkBgDark{
    background:black;
    color:white;
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
  p{
      font-family:"Playfair Display";
      font-size:20px;
      letter-spacing:3px;
  }
  .mkBtnDark{
    background:white;
    font-weight:bold;
    border:1px solid white;
    color:black;
  }
  </style>
