const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {type: String}
});

mongoose.model("Category", CategorySchema);

const Category = mongoose.model("Category");

createCategories();

function createCategories(){

  Category.find({}, function(err, categories){
    var cats = ["HTML", "CSS", "JAVASCRIPT", "MONGODB", "ANGULAR"];
    for(var i = 0; i < 5; i++){
      if(categories[i] == undefined){
        var newCat = new Category({name: cats[i]});
        newCat.save(function(err, newCat){
          if(err) console.log(err);
          else console.log(`${newCat}`);
        });
      }
    }
  });
}
