import { describe, expect, it } from "vitest";
import { validatefullConfig } from "../../src/config";
import { right } from "fp-ts/lib/Either";

describe('TEST for validateConfig',()=>{
    it('Given totally valid config input, when trigger validate funciton, then it should pass validation',()=>{
        // Arrange
        const processEnv = {
            port:'100',
            host:'qqqq',
            clientId: 'qqqq',
            clientSecret: 'qqqq',
            callbackUrl: 'qqqq',
            LDAPone: 'qqqq',
            LDAPtwo: 'qqqq',
        }
        // Act
        const result = validatefullConfig(processEnv)
        // Assert
        const expectResult={
            port:100,
            host:'qqqq',
            clientId: 'qqqq',
            clientSecret: 'qqqq',
            callbackUrl: 'qqqq',
            LDAPone: 'qqqq',
            LDAPtwo: 'qqqq',
        }
        if(result._tag == 'Right')expect(result.right).toStrictEqual((expectResult))
    })

    it('Given two invalid config input, when trigger validate funciton, then it should not pass validation and has two errors',()=>{
        // Arrange
        const processEnv = {
            port:'100222',
            host:'',
            clientId: 'qqqq',
            clientSecret: 'qqqq',
            callbackUrl: 'qqqq',
            LDAPone: 'qqqq',
            LDAPtwo: 'qqqq',
        }
        // Act
        const result = validatefullConfig(processEnv)
        // Assert
        const expectResult=[{
            "error": "port must be in the range 1-65535",
            "key": "port",
            "step": "isInRange",
          },
          {
            "error": "host must be a non-empty string",
            "key": "host",
            "step": "isNonEmpty",
          }
        ]

        expect(result._tag).toBe('Left')
        if(result._tag == 'Left')expect(result.left).toStrictEqual((expectResult))
    })

    it('Given a config input lack of host, when trigger validate funciton, then it should not pass validation',()=>{
        // Arrange
        const processEnv = {
            port:'100',
            clientId: 'qqqq',
            clientSecret: 'qqqq',
            callbackUrl: 'qqqq',
            LDAPone: 'qqqq',
            LDAPtwo: 'qqqq',
        }
        // Act
        const result = validatefullConfig(processEnv)
        // Assert
        const expectResult=[
          {
            "error": "host must exist",
            "key": "host",
            "step": "isExist",
          }
        ]

        expect(result._tag).toBe('Left')
        if(result._tag == 'Left')expect(result.left).toStrictEqual((expectResult))
    })
})