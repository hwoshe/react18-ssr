import { RootState } from '@/web/store'

type ResultTypes = {
  header: string
  footer: string
}

type PropsTypes = {
  assetScript?: string
  assetStyle?: string
  preloadState?: Partial<RootState>
}

const htmlTemplate = ({
  assetScript = '',
  assetStyle = '',
  preloadState
}: PropsTypes): ResultTypes => ({
  footer: `</div><script>window.REDUX_STORE=${preloadState}</script>${assetScript}</body></html>`,
  header: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">${assetStyle}</head><body><div id="root">`
})

export default htmlTemplate
