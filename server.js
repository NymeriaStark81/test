const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

dotenv.config()
if(process.env.NODE_EVN === 'local'){
    app.use(cors({
        origin: 'http://localhost:5173/',
        credentials: true
    }))
} else {
    app.use(cors({
        credentials: true
    }))
}


if(process.env.NODE_EVN === 'production') {
    app.use(express.static(path.join(__dirname, "./frontend/dist")))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, './', 'frontend', 'dist', 'index.html'))
    })
}

const dbConnect = async() => {
    try {
        if(process.env.NODE_EVN === 'local'){
            await mongoose.connect(process.env.LOCAL_DB_URI)
            console.log('Database connecting ...')
        } else {
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('Production database connecting ...')
        }
    } catch (error){
        console.log('Database connection failed')
    }
}

const PORT = process.env.PORT
app.listen(PORT, () => console.log('Server is running'))