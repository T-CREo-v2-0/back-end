import assert from 'assert'
import { cleanTweet } from '../../src/calculator/text-credibility'

describe('remove hashtags', () => {
  it('text with only one hashtag in the beginning', () => {
    assert.equal(cleanTweet('#mango'), '')
  })

  it('text with one hashtag in the beginning', () => {
    assert.equal(cleanTweet('#mango pear'), 'pear')
  })

  it('text with many hashtags', () => {
    assert.equal(cleanTweet('#mango pear #banana apple'), 'pear apple')
  })

  it('text with all hashtags', () => {
    assert.equal(cleanTweet('#mango #pear #apple'), '')
  })

  it('text with no hashtag', () => {
    assert.equal(cleanTweet('mango pear'), 'mango pear')
  })
})

describe('remove mentions', () => {
    it('text with only one mention in the beginning', () => {
      assert.equal(cleanTweet('@user'), '')
    })

    it('text with one mention in the beginning', () => {
      assert.equal(cleanTweet('@user pear'), 'pear')
    })

    it('text with many mentions', () => {
      assert.equal(cleanTweet('@user_one pear @user_two apple'), 'pear apple')
    })

    it('text with all mentions', () => {
      assert.equal(cleanTweet('@user @user_one @user_two'), '')
    })

    it('text with no mention', () => {
      assert.equal(cleanTweet('mango pear'), 'mango pear')
    })
})

describe('remove punctuation', () => {
    it('text with only punctuation', () => {
      assert.equal(cleanTweet('.'), '')
    })

    it('text with punctuation at the beggining', () => {
        assert.equal(cleanTweet('. pear'), 'pear')
    })

    it('text with punctuation before a word', () => {
      assert.equal(cleanTweet('.pear'), 'pear')
    })

    it('text with punctuation after a word', () => {
        assert.equal(cleanTweet('pear.'), 'pear')
    })

    it('text with punctuation separated from a word', () => {
        assert.equal(cleanTweet('pear .'), 'pear')
    })

    it('text with multiple punctuation', () => {
      assert.equal(cleanTweet('.pear . apple.'), 'pear apple')
    })

    it('text with all punctuation', () => {
      assert.equal(cleanTweet('...'), '')
    })

    it('text with no punctuation', () => {
      assert.equal(cleanTweet('mango pear'), 'mango pear')
    })
})

describe('remove URLs', () => {
    it('text with only one URL in the beginning', () => {
      assert.equal(cleanTweet('http://example.com'), '')
    })

    it('text with one URL in the beginning', () => {
      assert.equal(cleanTweet('http://example.com pear'), 'pear')
    })

    it('text with many URLs', () => {
      assert.equal(cleanTweet('pear http://example.com apple http://example2.com'), 'pear apple')
    })

    it('text with all URLs', () => {
      assert.equal(cleanTweet('http://example.com http://example2.com'), '')
    })

    it('text with no URL', () => {
      assert.equal(cleanTweet('mango pear'), 'mango pear')
    })
})

describe('remove emojis', () => {
    it('text with only one emoji in the beginning', () => {
      assert.equal(cleanTweet('🚀'), '')
    })

    it('text with one emoji in the beginning', () => {
      assert.equal(cleanTweet('🚀 pear'), 'pear')
    })

    it('text with many emojis', () => {
      assert.equal(cleanTweet('😍 pear 🚀 apple'), 'pear apple')
    })

    it('text with all emojis', () => {
      assert.equal(cleanTweet('🚀 😍 ❤️'), '')
    })

    it('text with no emoji', () => {
      assert.equal(cleanTweet('mango pear'), 'mango pear')
    })
})

describe('remove extra spaces', () => {
    it('text with only one extra space in the beginning', () => {
      assert.equal(cleanTweet('  '), '')
    })

    it('text with one extra space in the beginning', () => {
      assert.equal(cleanTweet('  pear'), 'pear')
    })

    it('text with many extra spaces', () => {
      assert.equal(cleanTweet('  pear    apple'), 'pear apple')
    })

    it('text with all spaces', () => {
      assert.equal(cleanTweet('    '), '')
    })

    it('text with no exta space', () => {
      assert.equal(cleanTweet('mango pear'), 'mango pear')
    })
})