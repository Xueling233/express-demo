var app = require('./app')
var fs = require('fs')
//自己封装的方法
// var Students = require('./students-fs')
var Students = require('./students')
var express = require('express')
var router = express.Router()
router.get('/students',function (req,res){
    Students.find(function(err,students){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('index.html',{
            fruits:[
                '苹果',
                '香蕉',
                '橘子',
                '花花'
            ],
            students:students
        })
    })
        // fs.readFile('./db.json','utf8',function(err,data){
        //  if(err){
        //      return res.status(500).send('Server error.')
        //  }
        //  var students = JSON.parse(data).students
        //  res.render('index.html',{
        //      fruits:[
        //          '苹果',
        //          '香蕉',
        //          '橘子',
        //          '花花'
        //      ],
        //      students:students
        //  })
        // })
    }
)
router.get('/students/new',function(req,res){
res.render('new.html')
})
router.post('/students/new',function(req,res){
//  自己封装的方法
//   Students.save(req.body,function(err){
//       console.log(req.body)
//       if(err){
//         return res.status(500).send('Server error.')
//       }
//       res.redirect('/students')
//   })

//mongoose
new Students(req.body).save(function(err){
    if(err){
        return res.status(500).send('Server error.')
    }
    res.redirect('/students')
})
    })
router.get('/students/edit',function(req,res){
    Students.findById(req.query.id,function(err,student){
            if(err){
                return res.status(500).send('Server error.')
            }
            res.render('edit.html',{
                student:student
            })
        })  
    //自己封装的方法
    // Students.findById(req.query.id,function(err,student){
    //     if(err){
    //         return res.status(500).send('Server error.')
    //     }
    //     res.render('edit.html',{
    //         student:student
    //     })
    // })  
})
router.post('/students/edit',function(req,res){

     Students.findByIdAndUpdate(req.body.id,req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
    //自己封装的方法
    // Students.updateById(req.body,function(err){
    //     if(err){
    //         return res.status(500).send('Server error.')
    //     }
    //     res.redirect('/students')
    // })
    
    
})
router.get('/students/delete',function(req,res){
     console.log(req.query.id)
     Students.findByIdAndRemove(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })

    //自己封装的方法
    // Students.updateById(req.body.id,function(err){
    //     if(err){
    //         return res.status(500).send('Server error.')
    //     }
    //     res.redirect('/students')
    // })
})
module.exports = router