import { Button } from 'react-bootstrap'
type EvidenceButtonProps<T> = {
  label: string
  imgSrc: string
  value: T
  onClick: (label: T) => void
  disabled?: boolean
  isSelected: boolean
}

export default function EvidenceButton<T>({
  label,
  imgSrc,
  onClick,
  disabled,
  value,
  isSelected,
}: EvidenceButtonProps<T>) {
  const handleClick = () => {
    onClick(value)
  }
  const buttonVariant = isSelected
    ? 'primary'
    : !disabled
    ? 'secondary'
    : 'outline-secondary'
  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      variant={buttonVariant}
      className="mb-2 mr-2"
      size="lg"
    >
      <img src={imgSrc} alt={label} className="pixelated mr-1" />
      {label}
    </Button>
  )
}
