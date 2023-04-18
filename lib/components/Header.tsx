import { tw } from '@twind/core'

export const Header = () => {
  return (
    <div className={tw('h-full bg-white backdrop-blur supports-backdrop-blur:bg-white/70')}>
      <h1>Header</h1>
    </div>
  )
}
