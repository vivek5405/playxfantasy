import styles from "./style.module.css"
import home_white from "/png/bottombar/home-white.svg"
import match_white from "/png/bottombar/match-white.svg"
import expert_white from "/png/bottombar/expert-white.svg"
import profile_white from "/png/bottombar/profile-white.svg"
import home_blue from "/png/bottombar/home-blue.svg"
import match_blue from "/png/bottombar/match-blue.svg"
import expert_blue from "/png/bottombar/expert-blue.svg"
import profile_blue from "/png/bottombar/profile-blue.svg"


const data = [
    {
        title : 'Home',
        path : '/',
        icon1 : home_white,
        icon2 : home_blue
    },
    {
        title : 'My Matches',
        path : '/my-matches',
        icon1 : match_white,
        icon2 : match_blue
    },
    {
        title : 'Expert',
        path : '/expert',
        icon1 : expert_white,
        icon2 : expert_blue
    },
    {
        title : 'Profile',
        path : '/profile',
        icon1 : profile_white,
        icon2 : profile_blue
    }
]

const Bottombar = ({onBottomBarClick, activeButton}) => {
  return (
    <>
      <div className={`fixed bottom-0 z-10 lg:bottom-[10px] ${styles.Bottombar_Main_Container}`} >
        <div className={`${styles.bottombar_main}`}>
          {data.map((link) => (
            <div
              onClick={() => onBottomBarClick(link.path)}
              className={`${styles.bottombar_link} `}
              key={link?.title}
            > 
              <img src={activeButton === link?.path ? link?.icon2 : link?.icon1} className={styles.bottombar_link_image} alt="bottom_icon"/>
              <p className={activeButton === link?.path ? styles.bottombar_link_title_active : styles.bottombar_link_title}>{link.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Bottombar