<template>
    <div class="third">
        <div class="container">
            <div class="navbar navbar-expand-sm navbar-dark bg-dark">
                <div class="navbar-nav">
                    <div class="nav-item">
                        <button class="btn btn-danger rounded-circle px-3 mr-5" data-toggle="modal" data-target="#modal1" style="font-size:25px;">+</button>
                        <button class="btn btn-info px-3 mr-3 mt-1 ml-2" @click="decide(All)">All</button>
                    </div>
                    <div class="nav-item " v-for="(take,index) in  catList" :key="index">
                        <button class="btn btn-info px-3 mr-3 mt-2 ml-2" @click="decide(take.cat)">{{ take.cat}}</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4" v-for="(take,index) in filtered" :key="index">
                    <div class="card mt-5">
                        <div class="card-header bg-dark text-white">
                            <h4 class="card-title">{{ take.uname}}</h4>
                        </div>
                        <div class="card-body">
                            <p> {{ take.info }}</p>
                            <hr>
                            <p> {{ take.select}}</p>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-dark" data-toggle="modal" data-target="#modal2" @click="editIt(index)">Edit</button>
                            <button class="btn btn-dark" @click="del(index)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- editing modal-->
        <div class="modal fade" id="modal2">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">Edit Post</h1>
                        <button class="btn btn-danger" data-dismiss="modal">X</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Uname</label>
                            <input type="text" class="form-control" placeholder="name" v-model="editUname"/>
                        </div>
                        <div class="form-group">
                            <label>Info</label>
                            <textarea class="form-control" type="text" placeholder="info" v-model="editInfo"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Category</label>
                            <input tpye='text' class="form-control" v-model="editSelect" placeholder="categroy"/>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-danger" @click="saveChange()" data-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Adding Post Modal -->
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
                                <input type="text" placeholder="enter Name" v-model="uname" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>info</label>
                                <textarea cols="50" type="text" placeholder="enter the information" v-model="info" class="form-control"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Category</label>
                                <select v-if="!change" class="form-control " v-model="select">
                                    <option  v-for="(take,index) in  catList" :key="index" >{{ take.cat}}</option>
                                </select>
                                <input v-if="change" type="text" v-model="select" placeholder="Category" class="form-control mt-3"/>
                                <button class="btn btn-danger mt-3" @click="catChange()">{{ btnCat }}</button>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-danger"  @click="addCat()" data-dismiss="modal">Add</button>
                        </div>
                  </div>
              </div>
          </div>
          <!--end-->
    </div>
</template>
  <script>
  export default {
    name: 'third',
    data () {
      return {
        catList:[],
        select:null,
        length:0,
        takeValue:0,
        info:null,
        takeIt:[],
        uname:null,
        filtered:[],
        fillValue:null,
        All:"All",
        editUname:null,
        editSelect:null,
        editInfo:null,
        editVal:null,
        change: false,
        btnCat:"Add"
      }
    },  
    methods:{
        del(index){
            let key = this.takeIt[index].key;
            firebase.database().ref("post/" + key).remove();
            this.filtered = this.takeIt;
        },
        addCat(){
            /* adding list of  buttons */
            this.change = false;
            this.takeValue = 0;
             for(let i=0 ;i<this.length ; i++){
                if(this.catList[i].cat === this.select){
                    this.takeValue+= 1;
                }
            } 
            if(this.takeValue < 1){
                firebase.database().ref("list").push({cat: this.select});
            }
            this.takeValue = 0;
            /* adding detail section */
            if(this.select === 'All' || this.select === 'all'){

            }
            else{
                firebase.database().ref("post").push({uname: this.uname , select: this.select , info : this.info})
            }
            this.filtered = this.takeIt;
            this.uname =null;
            this.select=null;
            this.info = null;
        },
        catChange(){
           this.change=true;
        },
        saveChange(){
            firebase.database().ref("post/" + this.editVal).set({
                uname : this.editUname,
                select: this.editSelect,
                info : this.editInfo
            })
            this.editUname=null,
            this.editSelect=null;
            this.editInfo=null;
            this.editVal=null;
            this.filtered = this.takeIt;
        },
        editIt(index){
            alert(index)
            this.editUname=null,
            this.editSelect=null;
            this.editInfo=null;
            this.editVal=null;
            this.editInfo = this.filtered[index].info;
            this.editSelect = this.filtered[index].select;
            this.editUname = this.filtered[index].uname;
            this.editVal = this.filtered[index].key;
            console.log(this.editVal)
        },
        decide(getIt){
            if(getIt === "All"){
                this.filtered = this.takeIt
            }
            else{
                 this.filtered = this.takeIt.filter((post)=>{
                 return post.select === getIt;
              })
            }
        }
    },
    created(){
        firebase.database().ref("list").on('value',(snapshot)=>{
            this.catList = Object.values(snapshot.val());
            this.length = this.catList.length;
        })
        firebase.database().ref("post").on('value',(snapshot)=>{
            let temp1 = Object.values(snapshot.val());
            let temp2 = Object.keys(snapshot.val());
            let len = temp2.length;
            for(let i=0;i<len;i++){
             temp1[i].key = temp2[i]
            }
            this.takeIt= temp1;
            console.log(this.takeIt);
        })
    }
 }
</script>
<style scoped>
</style>
