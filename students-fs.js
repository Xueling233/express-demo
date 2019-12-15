var fs = require("fs");
var dbPath = "./db.json";
exports.find = function(callback) {
  fs.readFile(dbPath, "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data).students);
  });
};
exports.save = function(student, callback) {
  fs.readFile(dbPath, "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).students;
    student.id = students[students.length - 1].id + 1;
    students.push(student);
    var fileData = JSON.stringify({
      students: students
    });
    fs.writeFile(dbPath, fileData, function(err, data) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};
exports.findById = function(id,callback){
  fs.readFile(dbPath, "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).student
    var stu = students.find(function(item){
      return item.id === id
    })
    callback(null,stu)
    
  })
}
exports.updateById = function(student,callback) {
  fs.readFile(dbPath, "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    student.id=parseInt(student.id)
    var students = JSON.parse(data).student
    var stu = students.find(function(item){
      return item.id === student.id
    })
    for(var key in studet) {
      stu[key] = student[k]
    }
    var fileData = JSON.stringify({
      students: students
    });
    fs.writeFile(dbPath,fileData,function(err){
      if (err){
        return callback(err)
      }
      callback(null)
    })
  });
};
exports.delete = function(id,callback) {
  fs.readFile(dbPath, "utf8", function(err, data) {
    if (err) {
      return callback(err);
    }
    var students = JSON.parse(data).student
    var stu = students.findIndex(function(item){
      return item.id === id
    })
    students.splice(stu,1)
    callback(null)
  })
  var fileData = JSON.stringify({
    students: students
  });
  fs.writeFile(dbPath,fileData,function(err){
    if (err){
      return callback(err)
    }
    callback(null)
  })
};
