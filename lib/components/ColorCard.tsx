import { tw } from '@twind/core'

type ColorCard = {
  shade: string,
  color: string,
  onClick?: () => void
}

export const ColorCard = ({ shade, color, onClick }: ColorCard) => (
  <div className={tw('')}>
    <div className={tw('w-24 h-24')} style={{ backgroundColor: color }} onClick={onClick ?? undefined}>
      <div className={tw('pl-2 pt-1 text-white text-lg font-bold font-space')}>{shade}</div>
    </div>
    <div className={tw('pt-1 font-bold text-lg font-space')}>{color}</div>
  </div>
)
