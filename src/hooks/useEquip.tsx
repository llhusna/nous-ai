import { useCallback, useState } from 'react'
import { useNousStore } from 'store'
import RPC from 'utils/ethers'

interface Props {
  perkId: string
}

const contractABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'perkId', type: 'uint256' },
    ],
    name: 'equip',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const useEquipPerk = ({ perkId }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { selectedNous } = useNousStore()

  const equipPerk = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const rpc = new RPC(window?.ethereum as any)
      await rpc.callContractMethod({
        contractABI,
        contractAddress: import.meta.env.VITE_NOUS_AI_NFT as string,
        method: 'equip',
        data: [Number(selectedNous?.token_id) as any, Number(perkId)],
        options: {
          value: '0',
        },
      })
    } catch (error) {
      console.error('Error purchasing perk:', error)
    } finally {
      setIsLoading(false)
    }
  }, [perkId, selectedNous?.token_id])

  return { equipPerk, isLoading, error }
}

export default useEquipPerk
