import cookies from 'next-cookies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DownloadButton from '../../componenets/DownloadButton/DownloadButton';
import FlagForm from '../../componenets/FlagForm/FlagForm';

const BASE_URL = "https://7b42-197-7-255-61.ngrok-free.app/"
// const BASE_URL = "http://localhost:3000/"


export async function getServerSideProps(context) {
  const { token } = cookies(context);
  console.log(token)

  if (!token && context.req.url !== '/login') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const res = await fetch(`${BASE_URL}/player?playerId=${token}`);
  const user = await res.json();
  const {id} = context.params

  if ("level" + user.level !== id) {
    return {
      redirect: {
        destination: `/level/level${user.level}`,
        permanent: false,
      },
    };
  }

  const currentLevel = id.match(/\d+$/)[0]
  const levelRes = await fetch(`${BASE_URL}getLevel?level=${currentLevel}`)
  const level = await levelRes.json()

  return {
    props: {
      user,
      level,
      currentLevel
    }
  };
  return {
    props : {
      
    }
  }
}



// function Level() {
function Level({ user, level, currentLevel }) {
  const router = useRouter();
  // console.log(user)
  // console.log(level)
  // const level = {
  //   Message: 'Your hidden message',
  //   Files: [ 'first.txt' ],
  //   Title: 'Level 1: Hidden message using steganography',
  //   // Image:  'test.png' ,
  //   Flag: 'flag1'
  // }

  // const currentLevel = 3
  // const user = {
  //   PLAYER_ID: '0x00P81ZSS8YI3Z7PUO9PV',
  //   EMAIL: '0x00P81ZSS8YI3Z7PUO9PV@example.com',
  //   PLAYER: 'user36',
  //   LEVEL: 4,
  //   UPDATED_AT: '2023-05-03T13:58:00.563Z'
  // }
  
  // window.open('https://www.example.com', '_blank');
  
  // if (currentLevel === "3") {

  // const ChromeDinoComponentNoSsr = dynamic(() => import('../../componenets/dino/Dino'), {
  //   ssr: false,
  // });

  //   return (
  //     <>
  //       <Head>
  //         <title>{level.Title}</title>
  //       </Head>
  //       <div>
  //         <ChromeDinoComponentNoSsr />
  //         <div style={{ display : "flex", alignItems: "center", flexDirection : "column"}}>
  //           <div style={{width : "600px"}}>

  //           <h1>Internal Server Error</h1>
  //           Try:
  //           <ul>
  //             <li>
  //               Refreshing The Page
  //             </li>
  //             <li>
  //             if refreshing doesn't work Call 56-488-593
  //             </li>
  //           </ul>
  //             SERVER_ERR_OR_IS_IT
  //           </div>
  //         </div>

  //       </div>
  //     </>
  //   );
  // }
  console.log(level.Images)
  return (
    <>
      <Head>
        <title>{level.Title}</title>
      </Head>
      <div className='level-container'>
        <div className='level'>
          <h2>Level Message : {level.Message}</h2>
          {
            level.Images &&
            <img className='level-image' src={`/images/test.png`} alt="idk" />
          }
          {
            level.Files &&
            <DownloadButton level={currentLevel} file={level.Files[0]} />
          }
          <FlagForm level={currentLevel} playerId={user.player_id} />
          {/* <DinoGame /> */}
        </div>
      </div>
    </>
  );
}

export default Level;
