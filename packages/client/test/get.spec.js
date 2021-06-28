import * as assert from 'uvu/assert'
import { FilecoinStorage, Blob } from 'filecoin.storage'

describe('get', () => {
  const { AUTH_TOKEN, API_PORT } = process.env
  const token = AUTH_TOKEN || 'good'
  const endpoint = new URL(API_PORT ? `http://localhost:${API_PORT}` : '')

  it('get a CAR', async () => {
    const client = new FilecoinStorage({ token, endpoint })
    const cid = 'bafkreifzjut3te2nhyekklss27nh3k72ysco7y32koao5eei66wof36n5e'
    const blob = await client.get(cid)
    assert.ok(blob)
    assert.is(
      blob.type,
      'application/car',
      `car type should be set correctly ${blob.type}`
    )
  })

  it('returns null on 404', async () => {
    const client = new FilecoinStorage({ token, endpoint })
    const cid = 'bafkreieq5jui4j25lacwomsqgjeswwl3y5zcdrresptwgmfylxo2depppq'
    const blob = await client.get(cid)
    assert.not.ok(blob, 'blob should be null')
  })

  it('throws on invalid cid', async () => {
    const client = new FilecoinStorage({ token, endpoint })
    const cid = 'bafkreieq'
    try {
      const blob = await client.get(cid)
      assert.unreachable('sholud have thrown')
    } catch (err) {
      assert.match(err, /400/)
    }
  })
})