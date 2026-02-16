import { AiFillNotification, AiOutlineNotification } from 'react-icons/ai'
import { BiCollection, BiSolidCollection } from 'react-icons/bi'
import { FaBlogger, FaBloggerB, FaRegUser, FaUser } from 'react-icons/fa'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { HiChat, HiOutlineChat } from 'react-icons/hi'
import { IoBookmark, IoBookmarkOutline, IoLanguage, IoLanguageOutline } from 'react-icons/io5'
import { PiPaperclipHorizontalFill, PiPaperclipHorizontalLight } from 'react-icons/pi'
import { RiSearchFill, RiSearchLine } from 'react-icons/ri'

export default [
  { 
    title: 'Home', 
    title_ch: '主页', 
    icon: GoHome, 
    icon2: GoHomeFill, 
    isAnon: true, 
    link: '/',
    link2: '/',
  },
  { 
    title: 'Search', 
    title_ch: '搜索', 
    icon: RiSearchLine, 
    icon2: RiSearchFill, 
    isAnon: true, 
    link: '/search',
    link2: '/search',
  },
  { 
    title: 'Bro', 
    title_ch: '会员', 
    icon: FaBlogger, 
    icon2: FaBloggerB, 
    isAnon: false, 
    link: '/premium',
    link2: '/premium',
  },
  { 
    title: 'Chat History', 
    title_ch: '聊天记录', 
    icon: HiOutlineChat, 
    icon2: HiChat, 
    isAnon: false, 
    link: '/profile/chat',
    link2: '/user/signin',
  },
  { 
    title: 'Bookmarks', 
    title_ch: '收藏', 
    icon: IoBookmarkOutline, 
    icon2: IoBookmark, 
    isAnon: false, 
    link: '/profile/bookmark',
    link2: '/user/signin',
  },
  { 
    title: 'Collections', 
    title_ch: '集合', 
    icon: BiCollection, 
    icon2: BiSolidCollection, 
    isAnon: false, 
    link: '/profile/collection',
    link2: '/user/signin',
  },
  { 
    title: 'Hosts', 
    title_ch: 'AI 智能体', 
    icon: PiPaperclipHorizontalLight, 
    icon2: PiPaperclipHorizontalFill, 
    isAnon: false, 
    link: '/hosts',
    link2: '/user/signin',
  },
  { 
    title: 'Profile', 
    title_ch: '个人资料', 
    icon: FaRegUser, 
    icon2: FaUser, 
    isAnon: false, 
    link: '/profile',
    link2: '/user/signin',
  },
  { 
    title: 'Languages', 
    title_ch: '语言设置', 
    icon: IoLanguageOutline, 
    icon2: IoLanguage, 
    isAnon: true, 
    link: '/languages',
    link2: '/languages',
  },
  { 
    title: 'Notification', 
    title_ch: '通知', 
    icon: AiOutlineNotification, 
    icon2: AiFillNotification, 
    isAnon: true, 
    link: '/notifications',
    link2: '/user/signin',
  },
]