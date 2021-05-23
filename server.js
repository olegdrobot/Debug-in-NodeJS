requer('dotenv').config();
const app = requier('app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
	console.log("Server is listening on 4000");
});