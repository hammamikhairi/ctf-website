import cookies from 'next-cookies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DownloadButton from '../../componenets/DownloadButton/DownloadButton';
import FlagForm from '../../componenets/FlagForm/FlagForm';

// const BASE_URL = "http://20.111.33.21/"
const BASE_URL = "http://localhost:5051/"
const BASE_WEBSITE_URL = "http://localhost:3000/"


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
  
  const currentLevel = id.match(/\d+$/)[0]
  if (user.level < currentLevel) {
    return {
      redirect: {
        destination: `/level/level${user.level}`,
        permanent: false,
      },
    };
  }
  
  const levelRes = await fetch(`${BASE_URL}getLevel?level=${currentLevel}`)
  const level = await levelRes.json()

  return {
    props: {
      user,
      level,
      currentLevel
    }
  };

}

function Level({ user, level, currentLevel }) {
  const router = useRouter();

  let hiddenInSource = null;
  if (level.Message.includes("$$")) {
    hiddenInSource = level.Message.split("$$")[1];
  }
  const levelMessage = level.Message.split("$$")[0];

  console.log(level.Images)
  return (
    <>
      <Head>
        <title>{level.Title}</title>
        {
          hiddenInSource != null &&
          <noscript>{hiddenInSource}</noscript>
        }
      </Head>
      <div className='level-container'>
        <div className='level'>
          <h2 style={{textAlign : "center"}}>{levelMessage}</h2>
          {
            currentLevel == 4 &&
            <a href={`${BASE_WEBSITE_URL}hint`} target="_blank">hint</a>
          }
          {
            level.Images && !level.Images[0].includes(".mp3") &&
            <img className='level-image' src={`/images/${level.Images[0]}`} alt="idk" />
          }
          {
            level.Audio &&
            <audio controls>
              <source src={`/assets/${level.Audio}`} type="audio/mpeg" />
              Browser doesn't support audio files
            </audio>
          }
          {
            level.Files &&
            <DownloadButton level={currentLevel} file={level.Files[0]} />
          }
          <FlagForm level={currentLevel} playerId={user.player_id} />
        </div>
      </div>
    </>
  );
}

export default Level;
