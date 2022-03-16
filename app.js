require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2ave6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => console.log("connected to mongodb"))
    .catch(err => console.error("not connected"))



const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    });



const Course = mongoose.model('Course', courseSchema)

async function createCourse(){
const course = new Course({
    name: "react Course",
    author: "Mart",
    tags: ['JS', 'react'],
    isPublished: true
})

const result = await course.save()
console.log(result)
}

//createCourse()

async function getCourse() {
    const courses = await Course.find();
    console.log(courses);
}

//getCourse()

// async function getFilteredCourses(){
//     const course = await Course.find({author: "Martynas", isPublished: true})

//     console.log(course);
// }

async function getFilteredCourses(){
    // const courses = await Course
    // .find({author:"Martynas", isPublished:true})
    // .limit(2)
    // .sort({name: 1})
    // .select({name: 1, tags: 1})
    // console.log(courses);
//-------------------------------------------------
    // const courses = await Course
    // .find()
    // .or([{author:"Martynas"},{isPublished:true}])
    // console.log(courses);
//-------------------------------------------------
    // const courses = await Course
    // .find({author:/^Martynas/})
    // .sort({name:1})
    // .select({author:1, name: 1, tags: 1})
    // console.log(courses);
//-------------------------------------------------
    // const courses = await Course
    // .find({author:/^Martynas/})
    // .find({name:/course$/i})
    // .sort({name:1})
    // .select({author:1, name:1, tags:1})
    // console.log(courses);
//-------------------------------------------------
    const courses = await Course
    .find({name:/.*db.*/i})
    .sort({name:1})
    .select({author:1, name:1, tags:1})
    console.log(courses);

}
//getFilteredCourses()

async function getCoursesNumber(){
    const courses = await Course
    .find()
    .count()
    console.log(courses);
}
//getCoursesNumber()

async function getCoursesPage(){
    const pageNumber = 1
    const pageSize = 2

    const courses = await Course
        .find()
        .skip((pageNumber - 1)*pageSize)
        .limit(pageSize)
        console.log(courses)
}
//getCoursesPage()

async function uptadeCourse(id){
    const course = await Course.findById(id)
    if(!course) return

    if(course.isPublished) return

    course.isPublished = true
    course.author = "Kitas autorius"
    const result = await course.save()
    console.log(result);
}

// getCourse()
// uptadeCourse("6231cc7397287b342ab4a344")
// getCourse()


async function removeCourse(id){
    // const result = await Course.deleteOne({_id: id})
    // console.log(result);
//----------------------------------
    // const course = await Course.findByIdAndRemove(id)
    // console.log(course);
//---------------------------------------
    const courses = await Course.deleteMany({
        isPublished: false
    })
    console.log(courses);
}

//removeCourse()

