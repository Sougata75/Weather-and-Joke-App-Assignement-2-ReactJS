import { useEffect, useState } from 'react';
import bgImg from '../assets/grainy-gradient-vertical-background-purple-orange-blue-black-glowing-mobile-wallpaper-dark-backdrop-design_284753-2861.jpg.jpeg';
import type { JokeType } from '../typescript/interface/interface';
import axios from 'axios';

function RandomJokes() {
    const [jokes,setJokes] = useState<JokeType>();
    const [errors,setErrors] = useState("");
    const [loading,setLoading] = useState<boolean>(false);
    const [reveal,setReveal] = useState<boolean>(false);
    const [count,setcount] = useState<boolean>(false);

    useEffect(() => {
        const fetchJoke = async() => {
            setLoading(true);
            try{
                const response = await axios.get(`https://official-joke-api.appspot.com/random_joke`);
                setJokes(response?.data);
            }catch(error:any){
                setErrors(error.message);
                console.log(errors);
            }finally{
                setLoading(false);
                setReveal(false);
            }
        }
        fetchJoke();
    },[count]);
  return (
    <>
    <div className="h-[100vh] flex justify-center md:items-center  bg-gray-900">
        <div className="w-[400px] h-full md:h-[650px] p-12 flex flex-wrap justify-center bg-cover bg-center bg-black md:rounded-3xl gap-16" style={{backgroundImage:`url(${bgImg})`}}>
            <h1 className="text-white text-3xl font-black txtShadow">Want Some Jokes</h1>
            <div className="w-full h-[250px] p-5 bg-black/10 backdrop-blur-md flex flex-wrap gap-y-4 rounded-xl">
            {loading? (
                <>
                <div className='w-full h-full flex justify-center items-center'>
                    <h2 className='text-xl text-white font-semibold'> loading ..... </h2>
                </div>
                </>
            ):(
                <>
                <div className='w-full'>
                <h2 className='text-yellow-500 text-xl font-semibold'>{jokes?.setup}</h2>
            </div>
            <div className='w-full flex flex-wrap justify-center items-center'>
                <h3 className={`${reveal? "block":"hidden"} text-yellow-500 text-xl font-semibold`}>{jokes?.punchline}</h3>
                <div className={`${reveal? "hidden":"block"} w-full flex justify-center items-end`}>
                    <button onClick={() => setReveal(true)} className={` text-white text-xl bg-white/15 backdrop-blur-xl px-12 py-2 rounded-2xl`}>Reveal</button>
                </div>
            </div>
                </>
            )}
            </div>
            <div className="w-full flex justify-center items-end">
                <button onClick={() => setcount((prev) => !prev)} className="text-black text-xl font-bold px-[93.5px] py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-600 transition-all">Genarate</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default RandomJokes