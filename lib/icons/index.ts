import type { SVGProps, ForwardedRef } from 'react'
import Info from './Info'
import InfoCircle from './InfoCircle'
import Link from './Link'
import Octocat from './Octocat'
import Warn from './Warn'
import WarnCircle from './WarnCircle'

export type IconComponent = (props: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => JSX.Element

export {
  Info,
  InfoCircle,
  Link,
  Octocat,
  Warn,
  WarnCircle
}
