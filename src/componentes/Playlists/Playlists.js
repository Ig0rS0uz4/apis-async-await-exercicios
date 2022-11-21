import React, {  useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios"

function Playlists() {
    const [playlists, setPlaylists] = useState([])
    const [nome, setNome] = useState("")

    const getAllPlaylists = async () =>{
       try {
        const res = await axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
          headers:{
            Authorization: "igor-souza-ammal"
          }
        })
        setPlaylists(res.data.result.list)
       } catch (error) {
        console.log(error)
       } 
      
      // axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
      //     headers:{
      //       Authorization: "igor-souza-ammal"
      //     }
      //   })
      //   .then((resposta)=>{
      //     setPlaylists(resposta.data.result.list)
      //   })
      //   .catch((erro)=>{
      //     console.log(erro)
      //   })
      }
      useEffect(()=>{
        getAllPlaylists()
      },[])
    
    const criaPlaylist = async ()=>{
      try {
        const body = {
          name: nome
      }

      const headers= {
          headers:{
              Authorization: "igor-souza-ammal"
          }
      }

      const res = await axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", body, headers)

      setPlaylists(res)
      } catch (error) {
        console.log(error)
      }
      
      // const body = {
      //        name: nome
      //    }

      //    const headers= {
      //        headers:{
      //            Authorization: "igor-souza-ammal"
      //        }
      //    }

      //    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", body, headers)
      //    .then((resposta)=>{
      //       console.log(resposta)
      //    })
      //    .catch((erro)=>{
      //       console.log(erro)
      //    })
     }
  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas 
                key={playlist.id} 
                playlist={playlist}/>
            })}
        </div>
    );
}

export default Playlists;
