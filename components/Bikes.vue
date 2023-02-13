<template>
  <div>
   <v-card class="pa-2">
      <v-col cols="12" md="6">
      <v-row>
      <v-select 
       placeholder="search by car name" 
       v-model="selectedItem"  
       :items="bikes"
       :disabled="searched"
       item-text="Make"
      
       item-value="Make"></v-select>
       <v-col>
      <div  style="padding-left:10px;margin-top:0rem;">
        <div  v-if="!searched" class="btnfirstLayer">
        <div class="btnSecondLayer">
          <v-btn @click="searchByName()" class="whitebutton" style="border-radius: 6px;background-image: linear-gradient(#ffffffba, #c8c5c5cc);"><b style="font-weight: 900;">GENERATE</b></v-btn> 
        </div>
       </div>
       <div  v-if="searched" class="btnfirstLayer2">
        <div class="btnSecondLayer2">
          <v-btn  @click="refresh()" class="whitebutton" style="border-radius: 6px;background-image: linear-gradient(#ffffffba, #c8c5c5cc);"><b style="font-weight: 900;">REFRESH</b></v-btn> 
        </div>
       </div>
      </div>
      
       </v-col>
       <br/>
      </v-row>
      </v-col>
      <table>
        <tr>
           <th  @click="SortColumnOntable(item.text)" v-for="item in Headers" :key="item.index"  class="text-left"> {{item.text}} <v-icon x-small>mdi-swap-vertical</v-icon> 
            </th>
         
        </tr>
        <tr 
           :search="search"
          v-for="item in bikes"
          :key="item.index"
        >
          <td style="width:90px">{{ item.BikeID }}</td>
          <td style="width:120px"><v-icon  color="blue">mdi-car</v-icon>{{ item.Make }}</td>
          <td style="width:110px">{{ item.Model }}</td>
          <td  style="width:90px">{{ item.Year }}</td>
          <td  style="width:140px">{{ item.Displacement }}</td>
          <td style="width:110px">{{ item.Price }}</td>
          <td>{{ item.Terrain }}</td>
          <td>{{ item.Description.substring(0,100) }}...</td>
          <td><v-btn dark class="blue darken-2" small @click="ReadMore(item)">Read More</v-btn></td>
        </tr>
         <v-dialog persistent
          v-model="descrptionDialog"
          transition="dialog-bottom-transition"
          max-width="600"
      >
          <v-card>
           <v-toolbar dense  dark  class="blue darken-2">
            
            <v-toolbar-title>{{bikeDescription.Make}}</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="descrptionDialog = false"
                >
                  Close
                </v-btn>
              </v-toolbar-items>
        </v-toolbar>
            <v-card-text>
              <v-card-title>Model: {{bikeDescription.Model}}</v-card-title>
              <v-card-subtitle>Year: {{bikeDescription.Year}}</v-card-subtitle>
              <v-card-subtitle>Displacement: {{bikeDescription.Displacement}}</v-card-subtitle>
              <v-card-subtitle>Price: {{bikeDescription.Price}}</v-card-subtitle>
              <v-card-subtitle>Terrain: {{bikeDescription.Displacement}}</v-card-subtitle>
              <v-card-subtitle>Displacement: {{bikeDescription.Displacement}}</v-card-subtitle>
              <v-card-subtitle>Description</v-card-subtitle>
              <v-card-text> {{bikeDescription.Description}}</v-card-text>
            </v-card-text>
          
          </v-card>
        </v-dialog>
      </table >
      
     </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return{
      searched: false,
      bikes: null,
      newList:[],
      selectedItem:null,
      bikeDescription: "",
      selectedColumn: "",
      search: "",
      sortedbyASC: true,
      descrptionDialog: false,
      Headers:[
           {
            text: 'BikeID',
            align: 'start',
            sortable: true,
            value: 'BikeID',
           }, 
              {
            text: 'Make',
            align: 'start',
            sortable: true,
            value: 'Make',
           }, 
              {
            text: 'Model',
            align: 'start',
            sortable: true,
            value: 'Model',
           }, 
              {
            text: 'Year',
            align: 'start',
            sortable: true,
            value: 'Year',
           }, 
              {
            text: 'Displacement',
            align: 'start',
            sortable: true,
            value: 'Displacement',
           }, 
              {
            text: 'Price',
            align: 'start',
            sortable: true,
            value: 'Price',
           }, 
              {
            text: 'Terrain',
            align: 'start',
            sortable: true,
            value: 'Terrain',
           }, 
              {
            text: 'Description',
            align: 'start',
            sortable: true,
            value: 'Description',
           },
              {
            text: 'ReadMore',
            align: 'start',
            sortable: true,
            value: 'Read more',
           },
            
      ]
    }   
  },
   mounted(){
     this.$services.RetrievalService.getBikesList().then( res => {
       this.bikes = res;
      })
      console.log("car items recieved")
  },
  computed:{
    updateBikeData(){
      return bikes
    },
    updateSelectedItem(){
      return selectedItem
    },
    updateBikeDescription(){
      return bikeDescription
    }
  },
 
  methods:{
   upperCase() {
      this.search = this.search.toLowerCase();
    },
    
    ReadMore(selectedCarItem){
      this.bikeDescription = selectedCarItem
      this.descrptionDialog= true
    },
    refresh(){
         this.bikes=[];
         this.newList=[];
          this.$services.RetrievalService.getBikesList().then( res => {
       this.bikes = res
      }); 
      this.selectedItem= null
      this.searched= false
    },
    searchByName(){
          this.searched= true
           this.bikes.forEach(element => {
          
            if(this.selectedItem == element.Make){
             this.newList.push(element)
            }
            
           });
           this.bikes=this.newList
         
        },
    
     SortColumnOntable(sortBy) {
      if (this.sortedbyASC) {
        this.bikes.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1))
        this.sortedbyASC = false;
      } else {
        this.bikes.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1))
        this.sortedbyASC = true;
      }
    },
  },
  
  
  }
</script>


<style >
.butn{
  color:black;
}
.btnfirstLayer{
  border: 1.7px solid rgba(0,0,0,0.50196);
    border-radius: 16px;
    width: 128.3px;
    padding-top: 1.6px;
    padding-left: 1.6px;
    padding-right: 1px;
    padding-bottom: 1.1px;
}
.btnSecondLayer{
width: 122px;
    padding-top: 0.33em;
    padding-left: 0.3em;
    padding-bottom: 0.33em;
    padding-right: 0.36em;
    background-color: rgba(128,128,128,0.30196);
    border-radius: 12px;
}
.btnfirstLayer2{
 border: 1.7px solid rgba(0,0,0,0.50196);
    border-radius: 16px;
    width: 118.3px;
    padding-top: 1.6px;
    padding-left: 1.6px;
    padding-right: 1px;
    padding-bottom: 1.1px;
}
.btnSecondLayer2{
    width: 112px;
    padding-top: 0.33em;
    padding-left: 0.3em;
    padding-bottom: 0.33em;
    padding-right: 0.36em;
    background-color: rgba(128,128,128,0.30196);
    border-radius: 12px;
}
</style>
<style lang="scss" scoped>
.theme--light.v-btn {
    color: rgb(0 0 0 / 67%);
}
.v-btn .whitebutton {
    width: 90px;
    align-items: center;
    border-radius: 4px;
    display: inline-flex;
    flex: 0 0 auto;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
    justify-content: center;
    outline: 0;
    position: relative;
    -webkit-text-decoration: none;
    text-decoration: none;
    text-indent: 0.0892857143em;
    text-transform: uppercase;
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
     
}
td,
th {
  border-top: 1px solid #dddddd;
  
  text-align: left;
  padding: 8px;
}
.v-btn--is-elevated {
    box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>