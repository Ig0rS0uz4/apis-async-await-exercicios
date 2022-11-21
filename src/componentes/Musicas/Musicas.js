import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [nome, setNome] = useState("")
    const [artista, setArtista] = useState("")
    const [url, setUrl] = useState("")

    const getPlaylistTracks = async ()=>{
        try {
            const res = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,{
            headers:{
                Authorization: "igor-souza-ammal"
            }
        })
        setMusicas(res.data.result.tracks)
        } catch (error) {
            console.log(error)
        }

        // axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,{
        //     headers:{
        //         Authorization: "igor-souza-ammal"
        //     }
        // })
        // .then((resposta)=>{
        //     setMusicas(resposta.data.result.tracks)
            
        // })
        // .catch((erro)=>{
        //     console.log(erro)
        // })

    }
    useEffect(()=>{
        getPlaylistTracks()
    },[])

    const addTrackToPlaylist = async ()=>{
        try {
            const body = {
                name: nome,
                artist: artista,
                url: url
            }
            const res = await axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, {
                headers:{
                    Authorization: "igor-souza-ammal"
                }
            })
            getPlaylistTracks()
        } catch (error) {
            console.log(error.response.data)
        }
        
        // const body = {
        //     name: nome,
        //     artist: artista,
        //     url: url
        // }
        // axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, {
        //     headers:{
        //         Authorization: "igor-souza-ammal"
        //     }
        // })
        // .then((resposta)=>{
        //     console.log(resposta)
        //     getPlaylistTracks()
        // })
        // .catch((erro)=>{
        //     console.log(erro.response.data)
        // })
    }

    const removeTrackFromPlaylist = async (id)=>{
        try {
            const res = await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,{
            headers:{
                Authorization: "igor-souza-ammal"
            }
        })
        } catch (error) {
            console.log(error)
        }

        // axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,{
        //     headers:{
        //         Authorization: "igor-souza-ammal"
        //     }
        // })
        // .then((resposta)=>{
        //     console.log(resposta)
        // })
        // .catch((erro)=>{
        //     console.log(erro)
        // })
    }

    const deletePlaylist = async () =>{
        try {
          const res = await axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}`,{
            headers:{
              Authorization: "igor-souza-ammal"
            }
          })
          
          props.setPlaylists(res.playlist.id)
        } catch (error) {
          console.log(error)
        }
    }

    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
                  <Botao onClick={deletePlaylist}>Deletar Playlist</Botao>
             {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        <button onClick={()=>removeTrackFromPlaylist(musica.id)}>X</button>
                    </Musica>)
            })} 
            <ContainerInputs>
                <InputMusica 
                placeholder="artista" 
                value={artista}
                onChange={(event)=>setArtista(event.target.value)}
                />
                <InputMusica placeholder="musica" 
                value={nome}
                onChange={(event)=>setNome(event.target.value)}
                />
                <InputMusica placeholder="url" 
                value={url}
                onChange={(event)=>setUrl(event.target.value)}
                />
                <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}

