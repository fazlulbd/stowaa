import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js'
import bannerRoters from './routes/bannerRoute.js'
import categoryRouters from './routes/categoryRouter.js'
import productRoutes from './routes/productRoute.js'
// configure env
dotenv.config()

// databse config
connectDB()

const app = express()

// middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/user', authRoutes)
app.use('/api', bannerRoters)
app.use('/api', categoryRouters)
app.use('/api', productRoutes)

app.get('/', function (req, res) {
  res.send("<h3>Welcome to stowaa ecommerce</h3>")
})

const PORT = process.env.PORT || 8001;
app.listen(PORT, ()=>{
    console.log(`Server is Running at http://localhost:${PORT}`)
})