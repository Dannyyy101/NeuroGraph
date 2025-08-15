import googleIcon from '../../public/google.svg'
import githubIcon from '../../public/github.svg'
import Image from 'next/image'

export const GoogleIcon = () => {
    return <Image width={40} height={40} src={googleIcon} alt={'google-icon'}></Image>
}

export const GithubIcon = () => {
    return <Image width={24} height={40} src={githubIcon} alt={'github-icon'}></Image>
}
