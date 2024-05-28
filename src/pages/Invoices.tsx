import { Button } from '@mantine/core'
import { countAtom, isLoadingAtom } from '../utils/atoms'
import { useAtom } from 'jotai'
import { sleep } from '../utils/utils'

const Invoices = () => {
  const [_, setIsLoading] = useAtom(isLoadingAtom)
  const [counter, setCounter] = useAtom(countAtom)

  const increment = async () => {
    setIsLoading(true)
    await sleep(1000)
    setCounter((c) => c + 1)
    setIsLoading(false)
  }

  return (
    <div>
      <Button color='lime' onClick={increment}>Increase +</Button>
      {counter}
    </div>
  )
}

export default Invoices