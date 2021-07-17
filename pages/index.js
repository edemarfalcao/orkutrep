import React from 'react'; 
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/BoxItem';
import { ProfileRelationsBoxWrapper } from '../src/components/profileRelationsArea';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet, } from '../src/lib/AlurakutCommons';



function ProfileSidebdar(props) {
  return (
    <Box as="aside">
    <img src= {`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}/>
    <hr/> 
    <p>
    <a className ="boxLink" href={`https://github.com/${props.githubUser}`}>
      @{props.githubUser}
    </a>
    </p>
    <hr/> 
    <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}
function ProfileRelationsBox (propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle"> 
          {propriedades.title}
          ({propriedades.items.length})
        </h2>
          <ul>
            {propriedades.items.slice(0,3).map((itemAtual) => {
          return (
              <li key={itemAtual.id}>
              <a href={itemAtual.html_url} key={itemAtual.id}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
        </ProfileRelationsBoxWrapper>
  )
}



export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id:'88748156',
    title: 'V.A.S.P',
    image: 'https://img10.orkut.br.com/community/18538602725e6b77a353bd40.62088362_03a7dd1e044e00c4b820e8de39448d68.jpg',
    
    
  }]);
  const gitUser = 'edemarfalcao';
  // const comunidades = ['Alurakut'];
  let pessoasFavoritas = [
    'telito',
    'rafaballerini',
    'filipedeschamps',
    'peas',
    'omariosouto',
    't',
  ] 
  pessoasFavoritas = (pessoasFavoritas)

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){ 
    fetch('https://api.github.com/users/edemarfalcao/following')
    .then(function (response){
      return response.json(); 
    })
    .then(function(fullResponse)  {
      setSeguidores(fullResponse);
    })
    
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'ea3ddd4c619869b46921ba8f2c68bc', 
        'Content-Type' : 'application/json',
        'Accept': 'application/json',

      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          id
          title
          imageUrl            
        }
      }` })
    })
    .then((response) => response.json()) //Pega o retorno o response.json
    .then ((fullResponse) => {
      const comunidadesDato = fullResponse.data.allCommunities;
      setComunidades(comunidadesDato)
    })
    

  }, []) 

  
  

  return (
    <>
    <AlurakutMenu/>
    <MainGrid>

      <div className="profileArea" style={{ gridArea: 'profileArea'}}>
           <ProfileSidebdar githubUser={gitUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
        <Box>
        <h1 className="title"> Bem vindo(a)</h1>
        <OrkutNostalgicIconSet/>
        </Box>
        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriarComunidade(e){
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            const comunidade = {
              title: dadosDoForm.get('title'),
              image_url: dadosDoForm.get('image'),
              creator_slug: gitUser, 
            }

            fetch('/api/comunidades', {
              method: 'POST', 
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async(response) => {
              const dados = await response.json(); 
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })


           
 
          }} >
               <div>
                  <input  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  />

               </div>
               <div>
                  <input  placeholder="Coloque uma URL para usar de capa"
                  name="image" 
                  aria-label="Coloque uma URL para usar de capa"/>
               </div>

               <button>
                 Criar comunidade
               </button>
            
            </form>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
      
        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Comunidades({comunidades.length})</h2>
          <ul>
            {comunidades.slice(0,6).map((itemF)=>{
              return (
               <li key={itemF.id} >
                  <a href={`/users/${itemF.id}`} key={itemF.id}>
                    <img src={itemF.imageUrl} /> 
                    <span>{itemF.title}</span>
                 </a>
                </li>
              
              )
            
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBox title="Seguindo" items={seguidores} />
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Pessoas da comunidade({pessoasFavoritas.length})</h2>
          <ul>
            {pessoasFavoritas.slice(0,3).map((itemF) =>{
            return (
              <li key={itemF}>
                <a href={`/users/${itemF}`} key={itemF}>
                <img src={`https://github.com/${itemF}.png`} />
                <span>{itemF}</span>
                 </a>
              </li>
              
              )
            
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
         
        
        </div>
     
    </MainGrid>
    </>
  )
}
